require("dotenv").config();
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
        .json({ message: "User have not been register yet" });
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
  
    const user = await prisma.user.findUnique({
      where: {
        id: id,
      },
      include: {
        ewallet: true,
      },
    });

    if (!user) {
      return res
        .status(404)
        .json({ message: "User have not been register yet" });
    }
    
    const currentTransfer = user.ewallet.transfer;
    const currentBalance = user.ewallet.balance;

    const updated = await prisma.ewallet.update({
      where: {
        userId: id,
      },
      data: {
        transfer: currentTransfer + amount,
        balance: currentBalance - amount,
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

    const user = await prisma.user.findUnique({
      where: {
        id: id,
      },
      include: {
        ewallet: true,
      },
    });

    if (!user) {
      return res
        .status(404)
        .json({ message: "User have not been register yet" });
    }

    const currentWithdraw = user.ewallet.withdraw;
    const currentBalance = user.ewallet.balance;

    const updated = await prisma.ewallet.update({
      where: {
        userId: id,
      },
      data: {
        withdraw: currentWithdraw + amount,
        balance: currentBalance + amount,
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
