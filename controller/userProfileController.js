require("dotenv").config();
const jwt = require("jsonwebtoken");
const SECRET = process.env.SECRET;

const infoUser = async (req, res) => {
  try {
    const token_ = req.headers.authorization;
    if (!token_)
      return res.status(401).json({ message: "Authenticated required" });

    // verify token
    const token = token_.split(" ")[1];
    const decoded = jwt.verify(token, SECRET);
    const userData = decoded.data;

    if (!userData) return res.status(403).json({ message: "Invalid token" });

    return res.status(200).json({ message: `You are authenticated`, data: userData });
  } catch (error) {
    return res.status(500).json({ error: error });
  }
};

module.exports = { infoUser };
