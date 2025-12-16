const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();
const bcrypt = require("bcryptjs");

const login = async (data) => {
  const user = await prisma.user.findUnique({
    where: {
      email: data.email,
    },
  });

  if (!user) {
    throw new Error("User not found");
  }

  const isPasswordValid = await bcrypt.compare(data.password, user.password);

  if (!isPasswordValid) {
    throw new Error("Invalid password");
  }

  return user;
};

const register = async (body) => {
  const role = await prisma.role.findUnique({
    where: {
      name: "CUSTOMER",
    },
  });

  if (!role) {
    throw new Error("Role CUSTOMER not found");
  }

  const user = await prisma.user.create({
    data: {
      email: body.email,
      name: body.name,
      password: await bcrypt.hash(body.password, 10),
      roleId: role.id,
      createdAt: new Date(),
      updatedAt: new Date(),
    },
  });

  return user;
};

module.exports = {
  login,
  register,
};
