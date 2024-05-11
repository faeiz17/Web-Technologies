import express from "express"
import mongoose from "mongoose"
import bodyParser from "body-parser"
import dotenv from "dotenv"
import route from "./routes/car-routes.js"

const app = express();

app.use(bodyParser.json())

dotenv.config();

const PORT = process.env.PORT || 5000;
const MONGOURL = process.env.MONGO_URL;

mongoose.connect(MONGOURL).then(() => {
    console.log("Mongo DB is connected")
    app.listen(PORT, () => {
        console.log(`server is running in ${PORT}`);

    })
}).catch(console.error());

app.use("/api/car", route)