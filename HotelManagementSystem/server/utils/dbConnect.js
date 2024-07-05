import mongoose from "mongoose";
import config from "config";

let connectDB = async ()=>{
    try {
       
        await mongoose.connect(config.get("URL"))
        console.log("Database connected Successfully 🚀")
        
    } catch (error) {
        console.log(error)
    }

}


connectDB()