import express from "express"
import mongoose from "mongoose"
import bodyParser from "body-parser"
import dotenv from "dotenv"
import route from "./routes/car-routes.js"
import authRoute from "./routes/auth.js"
import ejsLayouts from "express-ejs-layouts"
import methodOverride from "method-override";
import expressSession from "express-session"
import checkAuth from "./middlewares/check-auth.js"

import cookieParser from "cookie-parser"



const app = express();
app.use(cookieParser())

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }));
app.use(methodOverride('_method'));




dotenv.config();

app.set("view engine", "ejs")


app.use(ejsLayouts)
app.use(express.static("public"));
app.use(expressSession({ secret: "My Secret Key" }))


const PORT = process.env.PORT || 5000;
const MONGOURL = process.env.MONGO_URL;

mongoose.connect(MONGOURL).then(() => {
    console.log("Mongo DB is connected")
    app.listen(PORT, () => {
        console.log(`server is running in ${PORT}`);

    })
}).catch(console.error());




app.use("/", route)

app.use("/register", authRoute)
app.use("/login", authRoute)
app.use("/logout", authRoute)