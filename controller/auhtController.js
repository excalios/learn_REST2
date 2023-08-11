require("dotenv").config();
const { PrismaClient } = require("@prisma/client");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const prisma = new PrismaClient();
const SECRET = process.env.SECRET;

const register = async (req, res) => {
  const { email, password, name } = req.body;
  if (!name || !password || !name) {
    return res.status(401).json({ message: "Required name,password and name" });
  }
  const hashed = await bcrypt.hash(password, 10);
  try {
    // create user
    const user = await prisma.user.create({
      data: {
        email: email,
        name: name,
        password: hashed,
      },
    });

    // create ewallet
    await prisma.ewallet.create({
      data: {
        balance: 0,
        transfer: 0,
        withdraw: 0,
        userId: user.id,
      },
    });
    return res.status(200).json({
      message: "Register succesfully",
    });
  } catch (error) {
    return res.status(500).json({ error: error });
  }
};

const login = async (req, res) => {
  const { email, password } = req.body;
  if (!email || !password) {
    return res.status(401).json({ message: "Required email and password" });
  }
  try {
    const isExist = await prisma.user.findUnique({
      where: {
        email: email,
      },
      select: {
        id: true,
        email: true,
        name: true,
        ewallet: {
          select:{
            balance:true,
            transfer:true,
            withdraw:true
          }
        },
      },
      // Kalau mau ambil kolom yang berelasi gunakan include
      // !! include dan select tidak boleh se-level
      // include:{
      //   ewallet:true
      // },
    });

    if (!isExist) {
      return res
        .status(404)
        .json({ message: "User have not been register yet" });
    }

    if (!bcrypt.compareSync(password, isExist.password)) {
      return res.status(401).json({ message: "Invalid email and password" });
    }

    console.log(isExist);

    const token = jwt.sign({ data: isExist }, SECRET);
    return res.status(200).json({ token: token });
  } catch (err) {
    return res.status(500).json({ error: err });
  }
};

module.exports = { register, login };
