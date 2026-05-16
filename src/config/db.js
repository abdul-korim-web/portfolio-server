import mongoose from "mongoose"

export const databaseConnecttion=async()=>{
    try {
     mongoose.connect(process.env.MONGODB_URI)
   console.log("database connecttion successfuly");
   } catch (error) {
    console.log(error?.message || error);
   }
}