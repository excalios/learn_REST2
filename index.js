require("dotenv").config();

const express = require("express");
const cors = require("cors");
const createError = require("http-errors");
const { PrismaClient } = require("@prisma/client");
const authRouter = require('./route/authRoute')

const prisma = new PrismaClient();

const app = express();
const PORT = process.env.PORT || 5001;

app.use(cors());
app.use(express.json());

// async function main() {
//     // ... you will write your Prisma Client queries here
//     const allUsers = await prisma.user.findMany()
//     console.log(allUsers)
//   }

// main()
//   .then(async () => {
//     await prisma.$disconnect();
//   })
//   .catch(async (e) => {
//     console.error(e);
//     await prisma.$disconnect();
//     process.exit(1);
//   });

app.use('/user/auth', authRouter)

// middleware error
app.use(function (req, res, next) {
  next(createError.NotFound("Halaman tidak ditemukan"));
});

app.listen(PORT, () => {
  console.log("Sever Connected on", PORT);
});
