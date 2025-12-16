const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

const getAllUsers = async () => {
  return await prisma.user.findMany({
    select: {
      id: true,
      email: true,
      name: true,
      role: {
        select: {
          name: true,
        },
      },
      createdAt: true,
    },
  });
};

module.exports = {
  getAllUsers,
};
