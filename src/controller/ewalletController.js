require("dotenv").config();
const utils = require('../utils')
const { PrismaClient } = require("@prisma/client");


const prisma = new PrismaClient();

const getBalance = async (req, res) => {
  try {
    const { id } = req.user.data;

    const balanceUser = await prisma.ewallet.findUnique({
      where:{
        userId:id
      }
    })

    if (!balanceUser) {
      return res
        .status(404)
        .json({ message: "User have not been registered yet" });
    }

    return res.status(200).json({ data: balanceUser.balance });
  } catch (error) {
    return res.status(500).json({ error: error });
  }
};

const transfer = async (req, res) => {
  try {
    const { id } = req.user.data;
    const { amount } = req.body;
  
    const user = await utils.findUserByID(id)

    if (!user) {
      return res
        .status(404)
        .json({ message: "User have not been register yet" });
    }

    const {transfer, balance} = user.ewallet

    if(amount > balance)
      return res.status(400).json({message: "your balance is not enough"})

    const updated = await prisma.ewallet.update({
      where: {
        userId: id,
      },
      data: {
        transfer: transfer + amount,
        balance: balance - amount,
      },
    });

    return res.status(200).json({
      message: "succesfully transfer",
      data: updated,
    });
  } catch (error) {
    return res.status(500).json({ error: error });
  }
};

const withdraw = async (req, res) => {
  try {
    const { id } = req.user.data;
    const { amount } = req.body;

    const user = await utils.findUserByID(id)

    if (!user) {
      return res
        .status(404)
        .json({ message: "User have not been register yet" });
    }

    const {withdraw, balance} = user.ewallet;


    const updated = await prisma.ewallet.update({
      where: {
        userId: id,
      },
      data: {
        withdraw: withdraw + amount,
        balance: balance + amount,
      },
    });

    return res.status(200).json({
      message: "succesfully withdraw",
      data: updated,
    });
  } catch (error) {
    return res.status(500).json({ error: error });
  }
};
module.exports = { getBalance, transfer, withdraw };
