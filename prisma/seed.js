const { PrismaClient } = require("@prisma/client");
const bcrypt = require("bcryptjs");
const prisma = new PrismaClient();

async function main() {
  const roles = [{ name: "ADMIN" }, { name: "CUSTOMER" }, { name: "SELLER" }];
  const password = await bcrypt.hash("Abel*0120", 10);

  const users = [
    {
      name: "Admin",
      email: "admin@ecommerce.com",
      password: password,
      roleName: "ADMIN",
    },
    {
      name: "Customer",
      email: "customer@ecommerce.com",
      password: password,
      roleName: "CUSTOMER",
    },
    {
      name: "Seller",
      email: "seller@ecommerce.com",
      password: password,
      roleName: "SELLER",
    },
  ];

  console.log("Starting seeding...");

  for (const role of roles) {
    const upsertedRole = await prisma.role.upsert({
      where: { name: role.name },
      update: {},
      create: {
        name: role.name,
      },
    });
    console.log(`Created/Updated role: ${upsertedRole.name}`);
  }

  for (const user of users) {
    const role = await prisma.role.findUnique({
      where: { name: user.roleName },
    });

    if (!role) {
      console.warn(
        `Role ${user.roleName} not found used for user ${user.email}`
      );
      continue;
    }

    const upsertedUser = await prisma.user.upsert({
      where: { email: user.email },
      update: {},
      create: {
        name: user.name,
        email: user.email,
        password: user.password,
        code: "",
        roleId: role.id,
        codeExpiryAt: new Date(),
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    });
    console.log(`Created/Updated user: ${upsertedUser.name}`);
  }

  console.log("Seeding finished.");
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
