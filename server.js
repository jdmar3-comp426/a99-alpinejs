// Defining our app using express
var express = require("express")
var app = express()

// requiring database SCRIPT file
var db = require("./database.js")

// requiring md5 
var md5 = require("md5")

// requiring CORS
const cors = require("cors")

// make express use its own body parser
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// Make Express use CORS
app.use(cors());

// server port 
var HTTP_PORT = 5000

// start server 
const server = app.listen(HTTP_PORT, () => {
    console.log("Server running on port %PORT%".replace("%PORT%",HTTP_PORT))
});
// READ (HTTP method GET) at root endpoint /app/
app.get("/app/", (req, res, next) => {
    res.json({"message":"Our API works! (200)"});
	res.status(200);
});

// READ a list of all users (HTTP method GET) at endpoint /app/users/
app.get("/app/users", (req, res) => {	
	const stmt = db.prepare("SELECT * FROM usertable").all();
	res.status(201).json(stmt);
});

// CREATE a new user (HTTP method POST) at endpoint /app/new/
app.post("/app/new/user", (req, res) => {
	console.log(req.body);
    var errors = []
    if (!req.body.pass) {
        errors.push("password not specified!");
    }
    if (!req.body.email) {
        errors.push("email not specified!");
    }
    if (errors.length) {
        res.status(400).json({"error" : errors.join(",")});
        return;
    }
	const stmt = db.prepare("INSERT INTO usertable (user, pass, email) VALUES (?, ?, ?)");
	const info = stmt.run(req.body.user, md5(req.body.pass), req.body.email);
	res.status(201).json({"message" : info.changes+ " record created: ID " +info.lastInsertRowid + " (201)"});
});

// READ a single user (HTTP method GET) at endpoint /app/user/:id
app.get("/app/user/:id", (req, res) => {
	const stmt = db.prepare("SELECT * FROM usertable WHERE group_id = ?").get(req.params.id);
	res.status(201).json(stmt);
});

// UPDATE a single user (HTTP method PATCH) at endpoint /app/update/user/:id
app.patch("/app/update/user/:id", (req, res) => {
	const stmt = db.prepare("UPDATE usertable SET user = COALESCE(?,user), pass = COALESCE(?,pass), email = COALESCE(?,email) WHERE group_id = ?");
	const info = stmt.run(req.body.user, md5(req.body.pass), req.body.email, req.params.id);
	res.status(200).json({"message" : info.changes+ " record updated: ID " +req.params.id + " (200)"});
});

// DELETE a single user (HTTP method DELETE) at endpoint /app/delete/user/:id
app.delete("/app/delete/user/:id", (req, res) => {
	const stmt = db.prepare("DELETE FROM usertable WHERE group_id = ?");
	const info = stmt.run(req.params.id);
	res.status(200).json({"message" : info.changes+ " record deleted: ID " +req.params.id + " (200)"});
});

// CREATE new interaction at endpoint /app/interaction/
app.post("/app/interaction", (req, res) => {
	const stmt = db.prepare("INSERT INTO interactions (login, inventory, coins, grp_id) VALUES (?, ?, ?, ?)");
	const info = stmt.run(req.body.login, req.body.inventory, req.body.coins, req.body.grp_id);
	res.status(201).json({"message" : info.changes+ " record created: ID " +info.lastInsertRowid + " (201)"});
});

// READ a list of all interactions (HTTP method GET) at endpoint /app/interactions/
app.get("/app/interactions", (req, res) => {	
	const stmt = db.prepare("SELECT * FROM interactions").all();
	res.status(201).json(stmt);
});

// READ a single interaction (HTTP method GET) at endpoint /app/interaction/:id
app.get("/app/interaction/:id", (req, res) => {
	const stmt = db.prepare("SELECT * FROM interactions WHERE id = ?").get(req.params.id);
	res.status(201).json(stmt);
});

// UPDATE interaction at endpoint /app/update/interaction/:id
app.patch("/app/update/interaction/:id", (req, res) => {
	const stmt = db.prepare("UPDATE interactions SET login = COALESCE(?,login), inventory = COALESCE(?,inventory), coins = COALESCE(?,coins), grp_id = COALESCE(?,grp_id) WHERE id = ?");
	const info = stmt.run(req.body.login, req.body.inventory, req.body.coins, req.body.grp_id, req.params.id);
	res.status(200).json({"message" : info.changes+ " record updated: ID " +req.params.id + " (200)"});
});

// DELETE a single interaction (HTTP method DELETE) at endpoint /app/delete/interaction/:id
app.delete("/app/delete/interaction/:id", (req, res) => {
	const stmt = db.prepare("DELETE FROM interactions WHERE id = ?");
	const info = stmt.run(req.params.id);
	res.status(200).json({"message" : info.changes+ " record deleted: ID " +req.params.id + " (200)"});
});

// Default response for any other request not listed
app.use(function(req, res){
	res.json({"message":"Endpoint not found. (404)"});
    res.status(404);
});

// tell STDOUT that server is stopped
process.on('SIGTERM', () => {
	server.close(() => {
		console.log('Server stopped.');
	});
}); 