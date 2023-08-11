require("dotenv").config();
const prisma = require("../utils/prisma");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const SECRET = process.env.SECRET;

const register = async (req, res) => {
  const { email, password, name } = req.body;
  // Schema Validation (Joi)
  if (!email || !password || !name) {
    return res.status(400).json({ message: "Required email, password and name" });
  }
  try {
    const hashed = await bcrypt.hash(password, 10);
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
      data: {
        email: user.email,
      }
    });
  } catch (error) {
    return res.status(500).json({ error: error });
  }
};

const login = async (req, res) => {
  const { email, password } = req.body;
  if (!email || !password) {
    return res.status(400).json({ message: "Required email and password" });
  }
  try {
    const isExist = await prisma.user.findUnique({
      where: {
        email: email,
      },
      select: {
        id: true,
        email: true,
        password:true, // 'XXXXXXXXXXXX'
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
    })

    if (!isExist) {
      return res
        .status(404)
        .json({ message: "User have not been register yet" });
    }

    if (!bcrypt.compareSync(password, isExist.password)) {
      return res.status(400).json({ message: "Invalid email and password" });
    }

    const { password, ...user } = isExist

    const token = jwt.sign({ data: user }, SECRET);
    return res.status(200).json({ 
      data: {
        name: user.name
      },
      token: token
    });
  }
   catch (err) {
    return res.status(500).json({ error: err });
  }
};

module.exports = { register, login };
