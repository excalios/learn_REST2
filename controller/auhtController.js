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
    await prisma.user.create({
      data: {
        email: email,
        name: name,
        password: hashed,
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
    const isExist = await prisma.user.findFirst({
      where: {
        email: email,
      },
    });

    if (!isExist)
      return res
        .status(404)
        .json({ message: "User have not been register yet" });

    if (!bcrypt.compareSync(password, isExist.password)) {
      return res.status(401).json({ message: "Invalid email and password" });
    }

    const token = jwt.sign({ userId: isExist.id }, SECRET);
    return res.status(200).json({ token: token });
  } catch (error) {
    return res.status(500).json({ error: error });
  }
};

module.exports = { register, login };
