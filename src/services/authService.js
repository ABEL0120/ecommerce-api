const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();
const bcrypt = require("bcryptjs");

const login = async (email, password) => {
  const user = await prisma.user.findUnique({
    where: {
      email,
    },
  });

  if (!user) {
    throw new Error("User not found");
  }

  const isPasswordValid = await bcrypt.compare(password, user.password);

  if (!isPasswordValid) {
    throw new Error("Invalid password");
  }

  return user;
};

const register = async (email, password) => {
  const user = await prisma.user.create({
    data: {
      email,
      password: await bcrypt.hash(password, 10),
    },
  });

  return user;
};

module.exports = {
  login,
  register,
};
