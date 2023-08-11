const { PrismaClient } = require("@prisma/client");

const prisma = new PrismaClient();

// findUnique user (include e-wallet)
const findUserByID = async( id ) =>{
  const user =await prisma.user.findUnique({
    where: {
      id : id,
    },
    include: {
      ewallet: true,
    },
  });

  return user;
} 

module.exports = {findUserByID}