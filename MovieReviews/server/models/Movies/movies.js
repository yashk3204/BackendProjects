import mongoose from "mongoose";

const movieSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, "Name is a necessary field."]
    },
    year: {
        type: Number,
        required: [true, "Year is a necessary field."]
    },
    rating: {
        type: Number,
        required: [true, "Rating is a necessary field."]
    }
});

const movieModel = mongoose.model("Movies", movieSchema);
export default movieModel;