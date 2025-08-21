import { config } from "dotenv";

import connectDB from "../config/db";
import UserModel from "../models/userModle";

config();

const seedUsers = [
  // Female Users
  {
    email: "emma.thompson@example.com",
    fullName: "Emma Thompson",
    password: "$2a$10$29M4XqnsGyFB.BSxrDz7rOnaX.8JpytH0VbJ5W4QxX8lQwBs5PYKO",
    profilePic: "https://avatar.iran.liara.run/username?username=Emma+Thompson",
  },
  {
    email: "olivia.miller@example.com",
    fullName: "Olivia Miller",
    password: "$2a$10$29M4XqnsGyFB.BSxrDz7rOnaX.8JpytH0VbJ5W4QxX8lQwBs5PYKO",
    profilePic: "https://avatar.iran.liara.run/username?username=Olivia+Miller",
  },
  {
    email: "sophia.davis@example.com",
    fullName: "Sophia Davis",
    password: "$2a$10$29M4XqnsGyFB.BSxrDz7rOnaX.8JpytH0VbJ5W4QxX8lQwBs5PYKO",
    profilePic: "https://avatar.iran.liara.run/username?username=Sophia+Davis",
  },
  {
    email: "ava.wilson@example.com",
    fullName: "Ava Wilson",
    password: "$2a$10$29M4XqnsGyFB.BSxrDz7rOnaX.8JpytH0VbJ5W4QxX8lQwBs5PYKO",
    profilePic: "https://avatar.iran.liara.run/username?username=Ava+Wilson",
  },
  {
    email: "isabella.brown@example.com",
    fullName: "Isabella Brown",
    password: "$2a$10$29M4XqnsGyFB.BSxrDz7rOnaX.8JpytH0VbJ5W4QxX8lQwBs5PYKO",
    profilePic:
      "https://avatar.iran.liara.run/username?username=Isabella+Brown",
  },
  {
    email: "mia.johnson@example.com",
    fullName: "Mia Johnson",
    password: "$2a$10$29M4XqnsGyFB.BSxrDz7rOnaX.8JpytH0VbJ5W4QxX8lQwBs5PYKO",
    profilePic: "https://avatar.iran.liara.run/username?username=Mia+Johnson",
  },
  {
    email: "charlotte.williams@example.com",
    fullName: "Charlotte Williams",
    password: "$2a$10$29M4XqnsGyFB.BSxrDz7rOnaX.8JpytH0VbJ5W4QxX8lQwBs5PYKO",
    profilePic:
      "https://avatar.iran.liara.run/username?username=Charlotte+Williams",
  },
  {
    email: "amelia.garcia@example.com",
    fullName: "Amelia Garcia",
    password: "$2a$10$29M4XqnsGyFB.BSxrDz7rOnaX.8JpytH0VbJ5W4QxX8lQwBs5PYKO",
    profilePic: "https://avatar.iran.liara.run/username?username=Amelia+Garcia",
  },

  // Male Users
  {
    email: "james.anderson@example.com",
    fullName: "James Anderson",
    password: "$2a$10$29M4XqnsGyFB.BSxrDz7rOnaX.8JpytH0VbJ5W4QxX8lQwBs5PYKO",
    profilePic:
      "https://avatar.iran.liara.run/username?username=James+Anderson",
  },
  {
    email: "william.clark@example.com",
    fullName: "William Clark",
    password: "$2a$10$29M4XqnsGyFB.BSxrDz7rOnaX.8JpytH0VbJ5W4QxX8lQwBs5PYKO",
    profilePic: "https://avatar.iran.liara.run/username?username=William+Clark",
  },
  {
    email: "benjamin.taylor@example.com",
    fullName: "Benjamin Taylor",
    password: "$2a$10$29M4XqnsGyFB.BSxrDz7rOnaX.8JpytH0VbJ5W4QxX8lQwBs5PYKO",
    profilePic:
      "https://avatar.iran.liara.run/username?username=Benjamin+Taylor",
  },
  {
    email: "lucas.moore@example.com",
    fullName: "Lucas Moore",
    password: "$2a$10$29M4XqnsGyFB.BSxrDz7rOnaX.8JpytH0VbJ5W4QxX8lQwBs5PYKO",
    profilePic: "https://avatar.iran.liara.run/username?username=Lucas+Moore",
  },
  {
    email: "henry.jackson@example.com",
    fullName: "Henry Jackson",
    password: "$2a$10$29M4XqnsGyFB.BSxrDz7rOnaX.8JpytH0VbJ5W4QxX8lQwBs5PYKO",
    profilePic: "https://avatar.iran.liara.run/username?username=Henry+Jackson",
  },
  {
    email: "alexander.martin@example.com",
    fullName: "Alexander Martin",
    password: "$2a$10$29M4XqnsGyFB.BSxrDz7rOnaX.8JpytH0VbJ5W4QxX8lQwBs5PYKO",
    profilePic:
      "https://avatar.iran.liara.run/username?username=Alexander+Martin",
  },
  {
    email: "daniel.rodriguez@example.com",
    fullName: "Daniel Rodriguez",
    password: "$2a$10$29M4XqnsGyFB.BSxrDz7rOnaX.8JpytH0VbJ5W4QxX8lQwBs5PYKO",
    profilePic:
      "https://avatar.iran.liara.run/username?username=Daniel+Rodriguez",
  },
];

export const seedDatabase = async () => {
  try {
    await connectDB();

    await UserModel.insertMany(seedUsers);
    console.log("Database seeded successfully");
  } catch (error) {
    console.error("Error seeding database:", error);
  }
};
