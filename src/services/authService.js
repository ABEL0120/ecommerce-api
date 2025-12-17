const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();
const bcrypt = require("bcryptjs");
const tokenService = require("./tokenService");
const emailService = require("./emailService");

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

  const code = Math.floor(100000 + Math.random() * 900000).toString();
  const hashedCode = await bcrypt.hash(code, 10);

  await prisma.user.update({
    where: {
      id: user.id,
    },
    data: {
      code: hashedCode,
    },
  });
  await emailService.sendVerificationCode(user.email, code);

  return {
    user: {
      id: user.id,
    },
  };
};

const verifyCode = async (data) => {
  const user = await prisma.user.findUnique({
    where: {
      id: data.userId,
    },
  });

  if (!user) {
    throw new Error("User not found");
  }

  const isCodeValid = await bcrypt.compare(data.code, user.code);
  if (!isCodeValid) {
    throw new Error("Invalid code");
  }

  const accessToken = tokenService.generateAccessToken(user.id);
  const refreshToken = tokenService.generateRefreshToken(user.id);
  const expiresAt = new Date();
  expiresAt.setDate(expiresAt.getDate() + 7);

  await prisma.user.update({
    where: {
      id: user.id,
    },
    data: {
      code: "",
    },
  });

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
      role: user.role,
    },
    token: {
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
      code: "",
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
  verifyCode,
  logout,
};
