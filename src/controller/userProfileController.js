require("dotenv").config();
const jwt = require("jsonwebtoken");
const utils = require('./../utils/index')
const SECRET = process.env.SECRET;

const infoUser = async (req, res) => {
  try {
    const { id } = req.user.data
    // const token_ = req.headers.authorization;
    // if (!token_)
    //   return res.status(401).json({ message: "Authenticated required" });

    // // verify token
    // const token = token_.split(" ")[1];
    // const decoded = jwt.verify(token, SECRET);
    // const userData = decoded.data;
    const user = await utils.findUserByID(id)

    if (!user) return res.status(404).json({ message: "User not found" });

    return res.status(200).json({ message: `You are authenticated`, data: user });
  } catch (error) {
    return res.status(500).json({ error: error });
  }
};

module.exports = { infoUser };
