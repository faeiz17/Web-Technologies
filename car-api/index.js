import express from "express"
import mongoose from "mongoose"
import bodyParser from "body-parser"
import dotenv from "dotenv"
import route from "./routes/car-routes.js"
import ejsLayouts from "express-ejs-layouts"
import methodOverride from "method-override";

const app = express();

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }));
app.use(methodOverride('_method'));




dotenv.config();

app.set("view engine", "ejs")


app.use(ejsLayouts)
app.use(express.static("public"));

const PORT = process.env.PORT || 5000;
const MONGOURL = process.env.MONGO_URL;

mongoose.connect(MONGOURL).then(() => {
    console.log("Mongo DB is connected")
    app.listen(PORT, () => {
        console.log(`server is running in ${PORT}`);

    })
}).catch(console.error());

app.use("/cars", route)