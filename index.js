require('dotenv').config()

const express = require('express')
const cors = require('cors')
const createError = require('http-errors')

const app = express()
const PORT = process.env.PORT || 5001

app.use(cors())
app.use(express.json())


// middleware error
app.use(function(req,res,next) {
    next(createError.NotFound('Halaman tidak ditemukan'))
})

app.listen(PORT,() => {
    console.log('Sever Connected on', PORT)
})