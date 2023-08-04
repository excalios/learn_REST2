# Learn Authentification and Authorization

## CREATE
- method : POST
- endpoints : /user

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
