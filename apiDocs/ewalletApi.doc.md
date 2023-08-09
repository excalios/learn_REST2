# E-wallet

## BALANCE(total saldo)
- method : GET
- endpoints : /ewallet/balance

### Request headers
```json
{
   "X-token" : "bearer token"
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
- method : POST
- endpoints : /ewallet/transfer


### Request headers
```json
{
   "X-token" : "bearer token"
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
    "data" : balance + amount
}
```
### Response body on Fail
```json
{
    "error" : "Fail,user have not register yet"
}

```

## WITHDRAW
- method : POST
- endpoints : /ewallet/withdraw

### Request headers
```json
{
   "X-token" : "bearer token"
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
    "data" : balance + amount
}
```
### Response body on Fail
```json
{
    "error" : "Fail,user have not register yet"
}
```
