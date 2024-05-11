import express from "express"
import { fetch, create, update, deleteCar } from "../controller/car-controller.js"


const route = express.Router()

route.get("/fetch", fetch)
route.post("/create", create)
route.put("/update/:id", update)
route.delete("/delete/:id", deleteCar)

export default route;