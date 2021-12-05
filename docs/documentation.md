
# Backend

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
