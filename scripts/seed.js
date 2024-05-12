const { PrismaClient } = require('@prisma/client');

const prisma = new PrismaClient();

async function main() {
  await prisma.user.create({
    data: {
      id: 0,
      first_name: '',
      last_name: '',
      date_birth: new Date(),
      address: '',
      email: 'danielxbenadiaz10@gmail.com',
      mobile_phone: 'admin', // Cambia por el número de teléfono real
      password: '$2b$04$YlSZBf6knLWghgqKjcebDufhFJdBcFOli5MqVcwcpEKy9LWD4yDzK',
      session_active: false,
    },
  });
  console.log("Se ha creado el usuario administrador con exito!")
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
