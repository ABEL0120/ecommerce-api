const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

const getAllUsers = async (status = true) => {
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
    where: {
      status: status,
    },
  });
};

const getUser = async (userId, status = true) => {
  return await prisma.user.findUnique({
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
    where: {
      id: userId,
      status: status,
    },
  });
};

const updateUser = async (userId, data) => {
  return await prisma.user.update({
    where: {
      id: userId,
    },
    data: {
      name: data.name,
      email: data.email,
      password: data.password,
    },
  });
};

const deleteUser = async (userId) => {
  return await prisma.user.update({
    where: {
      id: userId,
    },
    data: {
      status: false,
    },
  });
};
module.exports = {
  getAllUsers,
  getUser,
  updateUser,
  deleteUser,
};
