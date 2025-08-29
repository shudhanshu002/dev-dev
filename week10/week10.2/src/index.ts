import { PrismaClient } from "./generated/prisma"; // <--- standard location after generate


const prisma = new PrismaClient();

async function insertUser(
  username: string,
  password: string,
  firstName: string,
  lastName: string
) {
  const res = await prisma.user.create({
    data: {
      email: username,
      password,
      firstName,
      lastName,
    },
  });
  console.log(res);
}

// (async () => {
//   try {
//     await insertUser("sudahnahu1@gamil.com", "password", "jaja", "singh");
//     await prisma.$disconnect(); // optional but good practice
//   } catch (e) {
//     console.error("❌ Error inserting user:", e);
//     await prisma.$disconnect();
//     process.exit(1);
//   }
// })();


async function updateUser(
  email: string,
  newFirstName: string,
  newLastName : string,
  newPassword : string
) {
  const res = await prisma.user.update({
    where: {email},
    data: {
      firstName: newFirstName,
      lastName: newLastName,
      password: newPassword
    }
  });
  console.log("User updated:", res);
}

// (async ()=> {
//   try {
//     await updateUser("sudahnahu@gamil.com","first","last","newsecure123");
//     await prisma.$disconnect();
//   } catch(e) {
//     console.error("Error updating user , ", e);
//     await prisma.$disconnect();
//     process.exit(1);
//   }
// })();


async function getAllUsers() {
  const users = await prisma.user.findMany();
  console.log("All users: ",users);
}

(async ()=> {
  try {
    await getAllUsers();
    await prisma.$disconnect();

  } catch(e) {
    console.error("Error fetchinfg users:", e);
    await prisma.$disconnect();
    process.exit(1);
  }
})();

