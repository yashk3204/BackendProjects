import mongoose from "mongoose";

const hotelSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    city: {
        type: String,
        required: true,
    },
    stars: {
        type: Number,
        required: true
    }
});

const hotelModel = mongoose.model("hotel", hotelSchema);
export default hotelModel;