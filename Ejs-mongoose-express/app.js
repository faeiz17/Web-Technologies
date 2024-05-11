const express = require('express');
const mongoose = require("mongoose")
let Cars = require("./models/Cars")

server.set("view enjine", "ejs");

server.post



const server = express()
server.use(express.json());





// app.get("/cars", (req, res) => {
//     res.json({
//         id: "1",
//         name: "Porsche 911",
//         color: {
//             1: "Black",
//             2: "Blue"
//         }
//     })
// })
server.listen(3000, () => console.log("Api Server Running..."))

// const mongoose = require('mongoose');
// const expressLayouts = require('express-ejs-layouts');

// const app = express();

// // MongoDB connection
// mongoose.connect('mongodb://localhost:27017/myapp')
//     .then(() => console.log('MongoDB Connected'))
//     .catch(err => console.log(err));