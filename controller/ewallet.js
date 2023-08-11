require("dotenv").config();
const { PrismaClient } = require("@prisma/client");

const prisma = new PrismaClient();

const getBalance = async (req, res) => {
  try {
    const payload = req.user.data;
    const balance = payload.ewallet.balance;
    console.log(payload);
    return res.status(200).json({ data: `Rp${balance}` });
  } catch (error) {
    return res.status(500).json({ error: error });
  }
};

const transfer = async (req, res) => {
  try {
    const { id } = req.user.data;
    const { amount } = req.body;
    const currentTransfer = req.user.data.ewallet.transfer;
    const currentBalance = req.user.data.ewallet.balance;

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

module.exports = { getBalance, transfer };
