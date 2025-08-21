import { connect } from "mongoose";

import { MONGO_URI } from "../constants/env";

const connectDB = async () => {
  try {
    await connect(MONGO_URI);
    console.log("MongoDB connected!");
  } catch (error) {
    console.error("Failed to connect to db: ", error);
    process.exit(1);
  }
};

export default connectDB;
