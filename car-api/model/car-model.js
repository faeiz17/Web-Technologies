import mongoose from "mongoose";

const carSchema = new mongoose.Schema({
    make: {
        type: String,
        required: true
    },
    model: {
        type: String,
        required: true
    },
    price: {
        type: String,
        required: true
    },
    year: {
        type: String,
        required: true
    },
})

export default mongoose.model("cars", carSchema)