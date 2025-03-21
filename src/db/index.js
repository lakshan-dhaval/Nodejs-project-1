import mongoose from "mongoose";
import { DB_Name } from "../constants.js";
import dotenv from "dotenv";
dotenv.config({ path: "./env" });


const connectDB = async () => {
  try {
    const connnectionInstance = await mongoose.connect(
      `${process.env.MONGODB_URI}/${DB_Name}?retryWrites=true&w=majority`
    );
    console.log(`\n MongoDB connection !! DB HOST:
             ${connnectionInstance.connection.host}`);
  } catch (error) {
    console.log("MONGODB connection Failed", error);
    process.exit(1);
  }
};

export default connectDB;                                                                                                                                                                                                                                                                                                    
