import mongoose from "mongoose";

const profSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, "Name is a necessary field."]
    },
    course: {
        type: String,
        required: [true, "Course is a necessary field."]
    },
    age: {
        type: Number,
        required: [true, "Age is a necessary field."]
    }
});

const profModel = mongoose.model("Professors", profSchema);
export default profModel;