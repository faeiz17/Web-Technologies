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
    },
    color: {
        type: String,
        required: false
    },
    horsepower: {
        type: String,
        required: false
    },
    category: {
        type: String,
        required: true,
        enum: [
            "Carrera",
            "Targa",
            "Turbo",
            "GT",
            "Special Models",
            "Cayman",
            "Boxster",
            "Cayman GT",
            "Spyder",
            "Sport Limousine",
            "Sport Turismo",
            "Cross Turismo",
            "Panamera Gasoline",
            "Panamera Hybrid",
            "Macan Gasoline",
            "Macan Hybrid",
            "SUV",
            "Coupé"
        ]
    }
});

export default mongoose.model("cars", carSchema);