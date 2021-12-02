// This ensures that things do not fail silently but will throw errors instead.
"use strict";
// Require better-sqlite.
const Database = require('better-sqlite3');

// Connect to a database or create one if it doesn't exist yet.
const db = new Database('users.db');

// Is the database initialized or do we need to initialize it?
const stmt = db.prepare(`SELECT name FROM sqlite_master WHERE type='table' and name='usertable';`);
let row = stmt.get();
if (row === undefined) {
// Echo information about what you are doing to the console.
    console.log('Your database appears to be empty. I will initialize it now.');
// Set a const that will contain your SQL commands to initialize the database.
        const sqlInit = `
        CREATE TABLE usertable ( group_id INTEGER PRIMARY KEY AUTOINCREMENT, user TEXT, pass TEXT, login INTEGER, inventory INTEGER, coins INTEGER, email TEXT UNIQUE, CONSTRAINT email_unique UNIQUE (email) );
		INSERT INTO usertable (user, pass, email) VALUES ('admin','1234','123email@gmail.com'), ('test','5678','456email@gmail.com');
        `;
// Execute SQL commands that we just wrote above.
    db.exec(sqlInit);
// Echo information about what we just did to the console.
    console.log('Database has been initialized with two tables, one for users and one for interactions.');
} else {
// Since the database already exists, echo that to the console.
    console.log('Database exists!')
}
// Export all of the above as a module so that we can use it elsewhere.
module.exports = db