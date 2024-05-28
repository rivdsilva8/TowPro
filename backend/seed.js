import { dbConnection, closeConnection } from "./config/mongoConnection.js";

async function seedDatabase() {
  const db = await dbConnection();
  await db.dropDatabase();
}

seedDatabase();
