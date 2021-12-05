
# Back-end

## Intro
Our server is implement with ```Express.js```, which is used as a web server for our API.

```sqlite3``` is used to created our **database**

This is the overview of our **database**
```sqlite3
TABLE usertable {
    group_id INTEGER PRIMARY KEY AUTOINCREMENT, 
    user TEXT, 
    pass TEXT, 
    login INTEGER, 
    inventory INTEGER, 
    coins INTEGER, 
    email TEXT UNIQUE, 
    CONSTRAINT email_unique UNIQUE (email) 
};

```

## Endpoints


### GET /app/
* READ at root endpoint
* Parameters : ```none```
* Returns :
```javascript
{
  "message" : string
}
```

### GET /app/users
* READ a list of all users
* Parameters : ```none```
* Returns :
```javascript
[{ 
  "group_id": int,
  "user": string,
  "pass": string,
  "login": string
  "inventory": int, 
  "coins": int,
  "email": string
}]
```

### POST /app/new/user
* CREATE a new user
* Parameters : 
```javascript
{  
    "user": string,
    "pass": string, 
    "email"; string
}
```
* Returns :
```javascript
{ 
  "message" : string
}
```

### GET /app/user/:id
* READ a single user
* Parameters : 
```javascript
{  
    "id": int
}
```
* Returns :
```javascript
{ 
  "group_id": int,
  "user": string,
  "pass": string,
  "login": string
  "inventory": int, 
  "coins": int,
  "email": string
}
```

### PATCH /app/update/user/:id
* UPDATE a single user
* Parameters : 
```javascript
{  
  "user": string,
  "pass": string,
  "login": string
  "inventory": int, 
  "coins": int,
  "email": string, 
  "id": int
}
```
* Returns :
```javascript
{ 
  "message": string
}
```

### DELETE /app/delete/user/:id
* DELETE a single user 
* Parameters : 
```javascript
{  
    "id": int
}
```
* Returns :
```javascript
{ 
  "message": string
}
```

### POST /app/login/user
* authenticate login information (user and pass)
* Parameters : 
```javascript
{  
    "user": string, 
    "pass": string
}
```
* Returns :
```javascript
{ 
  "group_id": int,
  "user": string,
  "pass": string,
  "login": string
  "inventory": int, 
  "coins": int,
  "email": string
}
```

### POST /app/connect/user
* connect to database again
* Parameters : 
```javascript
{  
  "user": string
}
```
* Returns :
```javascript
{ 
  "group_id": int,
  "user": string,
  "pass": string,
  "login": string
  "inventory": int, 
  "coins": int,
  "email": string
}
```
## Status codes

Status codes|Description
---|---
200|OK
201|CREATED
400|BAD REQUEST
404|NOT FOUND


# Front-end

## Intro
Our front-end is implement with ```Vanilla js```,```HTML```, ```CSS```, and ```Bulma```(CSS framework). 

## Login Interface

![c100d063e39e4088a15b150e79019a6f](https://user-images.githubusercontent.com/58484241/144730993-9f569547-242f-4a72-b7c0-72506a66c30c.jpeg)

* Users can either create a new account or sign in using an existing account. 
    * email, username and password must be specified to create an account. 
    * email and password field should exist in the database in order to login. 
    * click on **"submit"** or **"login"** button to either create an account or login. 
* Users will be directed to the game-play page after logging in. 


## Game-play 

![6e1e95bf0a7f4e63a6002c64ae574ea5](https://user-images.githubusercontent.com/58484241/144730995-8eea0703-8684-4d4f-8e1f-b9aba732782b.jpeg)

* Users can harvest or sell their potatos by clicking on **"Harvest"** or **"Sell"** button to gain coins and potatos. 
* Users can check quantity of coins and potatos by clicking on **"Check Potatos and Coins!"** button. 
* Users can exit the game or delete the account by clicking on **"Exit"** or **"Delete Account"** button. 
    *  Progress of the game (inventory and coin) will be saved on Exit. 
    *  User information will be deleted from the database when the account is deleted. 

