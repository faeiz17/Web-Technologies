import mongoose from "mongoose";

const carSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    model: {
        type: String,
        required: true
    },
    price: {
        type: Number,
        required: true
    },
    year: {
        type: String,
        required: true
    },
    zto60: {
        type: String,
        required: false
    },
    speed: {
        type: String,
        required: false
    },
    image: {
        type: String,
        required: false
    },

    description: {
        type: String,
        required: false
    },
    range: {
        type: String,
        required: false
    },
    rearLuggage: {
        type: String,
        required: false
    }


})

export default mongoose.model("cars", carSchema)