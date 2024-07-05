import express from "express";
import config from "config";
import "./utils/dbConnect.js";
import router from "./controllers/hotelController.js"

const app = express();
const PORT = config.get("PORT");
app.use(express.json());

app.get("/",(req,res)=>{
    try {
        res.status(200).json({msg:'Server2 is Up and Running'})
    } catch (error) {
        console.log(error);
        res.status(500).json({msg:error})
    }
});







app.use("/api/hotels",router);

app.use((req,res)=>{
    res.send("Not Found 404")
});

app.listen(PORT,()=>{
    console.log(`Successfully Running on ${PORT}`)
});