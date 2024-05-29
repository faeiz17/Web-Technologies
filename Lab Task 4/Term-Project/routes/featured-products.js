import express from "express";
import Products from "../model/featured.js";

const routeProducts = express.Router();

routeProducts.get("/products", async(req, res) => {
    try {
        const products = await Products.find();
        if (products.length === 0) {
            return res.status(404).json({ message: "No products found" });
        }
        res.status(200).json(products);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Internal server error" });
    }
});

routeProducts.post("/products/create", async(req, res) => {
    try {
        const { name, price, image, description, category, isFeatured } = req.body;

        if (!name || !price || !description || !category) {
            return res.status(400).json({ error: "All required fields must be provided" });
        }

        const newProduct = new Products({
            name,
            price,
            image,
            description,
            category,
            isFeatured: isFeatured || false
        });

        const savedProduct = await newProduct.save();
        res.status(201).json(savedProduct);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Internal server error" });
    }
});

routeProducts.get("/products/:id", async(req, res) => {
    try {
        const productId = req.params.id;
        const product = await Products.findById(productId);

        if (!product) {
            return res.status(404).json({ message: "Product not found" });
        }

        if (!req.session.visitedProducts) {
            req.session.visitedProducts = [];
        }

        if (!req.session.visitedProducts.includes(productId)) {
            req.session.visitedProducts.push(productId);
        }
        res.status(200).json(product);
    } catch (error) {
        console.error("Error fetching product:", error);
        res.status(500).json({ error: "Internal server error" });
    }
});

routeProducts.get("/visited-products", async(req, res) => {
    try {
        const visitedProductIds = req.session.visitedProducts || [];
        const visitedProducts = await Products.find({ _id: { $in: visitedProductIds } });
        res.status(200).json(visitedProducts);
    } catch (error) {
        console.error("Error fetching visited products:", error);
        res.status(500).json({ error: "Internal server error" });
    }
});

routeProducts.get("/featured-products", async(req, res) => {
    try {
        const featuredProducts = await Products.find({ isFeatured: true });
        if (featuredProducts.length === 0) {
            return res.status(404).json({ message: "No featured products found" });
        }
        res.status(200).json(featuredProducts);
    } catch (error) {
        console.error("Error fetching featured products:", error);
        res.status(500).json({ error: "Internal server error" });
    }
});





export default routeProducts;