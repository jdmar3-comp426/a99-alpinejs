
# Documentation

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

## Status codes

Status codes|Description
---|---
200|OK
201|CREATED
400|BAD REQUEST
404|NOT FOUND
