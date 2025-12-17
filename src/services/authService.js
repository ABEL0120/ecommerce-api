const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();
const bcrypt = require("bcryptjs");

const tokenService = require("../utils/tokenService");

const login = async (data) => {
  const user = await prisma.user.findUnique({
    where: {
      email: data.email,
    },
    include: {
      role: true,
    },
  });

  if (!user) {
    throw new Error("Invalid credentials");
  }

  const isPasswordValid = await bcrypt.compare(data.password, user.password);

  if (!isPasswordValid) {
    throw new Error("Invalid credentials");
  }

  const accessToken = tokenService.generateAccessToken(user.id);
  const refreshToken = tokenService.generateRefreshToken(user.id);

  const expiresAt = new Date();
  expiresAt.setDate(expiresAt.getDate() + 7);

  await prisma.authToken.create({
    data: {
      token: refreshToken,
      userId: user.id,
      expiresAt: expiresAt,
    },
  });

  return {
    user: {
      id: user.id,
      email: user.email,
      name: user.name,
      role: user.role.name,
    },
    tokens: {
      accessToken,
      refreshToken,
    },
  };
};

const logout = async (userId) => {
  const result = await prisma.authToken.deleteMany({
    where: {
      userId: userId,
    },
  });
  return result;
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
  logout,
};
