const { PrismaClient } = require("@prisma/client");
const bcrypt = require('bcrypt')

const prisma = new PrismaClient();

const register = async(req, res) => {
  const {email, password, name} = req.body
  if(!name || !password || !name){
    return res.status(401).json({message:"Required name,password and name"})
  }
  const hashed = await bcrypt.hash(password, 10)
  try {
    const newUser = await prisma.user.create({
      data:{
        email: email,
        name:name,
        password:hashed
      }
    })
    return res.status(200).json({
      message:"Register succesfully"
    })
  } catch (error) {
    return res.status(500).json({error: error})
  }
}

module.exports = { register }