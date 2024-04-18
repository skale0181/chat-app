import mongoose from "mongoose";

const connectToMongoDB = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URL);
    console.log("connected to the mongo DB");
  } catch (error) {
    console.log("error connecting to the mongodb", error.message);
  }
};


export default connectToMongoDB;