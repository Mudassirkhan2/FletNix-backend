import mongoose from "mongoose"
const connection = {};
import dotenv from 'dotenv';
dotenv.config();
export const connectToDB = async () => {

  try {
    if (connection.isConnected) return;
    const db = await mongoose.connect(process.env.MONGO_URI);
    connection.isConnected = db.connections[0].readyState;
    console.log("Connection to DB is successful");
  } catch (error) {
    console.log(error)
    throw new Error(error);
  }
};
