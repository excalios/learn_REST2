# E-wallet

## BALANCE(total saldo)
- method : GET
- endpoints : /ewallet/balance

### Request headers
```json
{
   "token" : "bearer token"
}
```

### Response body on Success
```json
{
    "data" : "1_000_000"
}
```
### Response body on Fail
```json
{
    "error" : "Fail,user registrated"
}
```
## TRANSFER 
- method : PATCH
- endpoints : /ewallet/transfer


### Request headers
```json
{
   "token" : "bearer token"
}
```

### Request body
```json
{
    "amount" : "200_000"
}
```

### Response body on Success
```json
{
    "message" : "Transfer successfully",
    "data": {
        "id": X,
        "balance": balance - amount,
        "transfer": transfer + amount,
        "withdraw": XXXX,
        "userId": XX
    }
}
```
### Response body on Fail
```json
{
    "error" : "Fail,user have not register yet"
}

```

## WITHDRAW
- method : PATCH
- endpoints : /ewallet/withdraw

### Request headers
```json
{
   "token" : "bearer token"
}
```
### Request body
```json
{
    "amount" : "200_000"
}
```
### Response body on Success
```json
{
    "message" : "withdraw succesfully",
    "data": {
        "id": X,
        "balance": balance + amount,
        "transfer": XXXX,
        "withdraw": balance + amount,
        "userId": XX
    }
}
```
### Response body on Fail
```json
{
    "error" : "Fail,user have not register yet"
}
```
