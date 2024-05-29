import mongoose from "mongoose";

const FeaturedProductSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    price: {
        type: Number,
        required: true
    },
    image: {
        type: String,
        required: false
    },
    description: {
        type: String,
        required: true
    },
    category: {
        type: String,
        required: true
    },
    isFeatured: {
        type: Boolean,
        default: false
    }
});

const Products = mongoose.model("Products", FeaturedProductSchema);
export default Products;