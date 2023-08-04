# Learn Authentification and Authorization

## CREATE/REGISTER
- method : POST
- endpoints : /user/auth/register

### Request body
```json
{
    "email": "aaaaa",
    "password": "aaaaa",
    "username": "aaaaa"
}
```

### Response body on Success
```json
{
    "message" : "Registration successfully"
}
```
### Response body on Fail
```json
{
    "error" : "Fail,user registrated"
}
```
## LOGIN
- method : POST
- endpoints : /user/auth/login

### Request body
```json
{
    "email": "aaaaa",
    "password": "aaaaa",
    "username": "aaaaa"
}
```

### Response body on Success
```json
{
    "token" : "jwt with username as payload"
}
```
### Response body on Fail
```json
{
    "error" : "Fail,user have not register yet"
}

```

## MY_PROFILE
- method : GET
- endpoints : /user/:Currentid

### Request headers.Authorization
```json
{
    "X-token" : "jwt"
}
```

### Response body on Success
```json
{
    "email": "aaaaa",
    "username": "aaaaa"
}
```
### Response body on Fail
```json
{
    "error" : "Fail,user have not register yet"
}
```

## SEARCH_BY_EMAIL
- method : GET
- endpoints : /user/?email=XXX

### Request headers.Authorization
```json
{
    "X-token" : "jwt"
}
```
###  Request body
```json
{
    "email": "some"
}
```
### Response body on Success
```json
{
    "email": "aaaaa",
    "username": "aaaaa"
}
```
### Response body on Fail
```json
{
    "error" : "Fail,user have not register yet"
}
```
