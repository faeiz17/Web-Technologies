import express from "express"
import Cars from "../model/car-model.js"


const route = express.Router()





const create = async(req, res) => {
    console.log(req.body);
    try {
        const { name, model, year, price, zto60, speed, image, description, range, rearLuggage } = req.body;

        // Check if model is provided
        if (!model) {
            return res.status(400).json({ error: "Model is required" });
        }

        // Check if the model already exists
        const existingCar = await Cars.findOne({ model });
        if (existingCar) {
            return res.status(400).json({ error: "Car already exists" });
        }

        // Create a new Car instance with provided fields
        const carData = new Cars({ name, model, year, price, zto60, speed, image, description, range, rearLuggage });

        // Save the new car to the database
        const savedCar = await carData.save();

        // Redirect to the fetch route after successful creation
        return res.redirect("/cars/fetch");
    } catch (error) {
        console.error(error);
        return res.status(500).json({ error: "Internal server error" });
    }
};


const fetch = async(req, res) => {
    try {
        const cars = await Cars.find()
        if (cars === 0) {
            return res.status(404).json({ message: "No Cars in the collection" })
        }
        // res.status(200).json(cars)
        res.render('cars', { cars: cars });
    } catch (error) {
        res.status(500).json({
            error: "internal server error"
        })
    }

}

const update = async(req, res) => {
    try {
        const id = req.params.id;
        const carExist = await Cars.findOne({ _id: id })
        if (!carExist) {
            return res.status(404).json({ message: "car not found" })
        }
        const updateCar = await Cars.findByIdAndUpdate(id, req.body, { new: true })
            // Redirect to the car list page after successful update
        res.redirect("/cars/fetch");
    } catch (error) {
        res.status(500).json({
            error: "internal server error"
        })
    }
}


const deleteCar = async(req, res) => {
    try {
        const id = req.params.id;
        const carExist = await Cars.findOne({ _id: id });
        if (!carExist) {
            return res.status(404).json({ message: "Car not found" });
        }

        await Cars.findByIdAndDelete(id);

        // Redirect to the fetch route after successful deletion
        res.redirect("/cars/fetch");
    } catch (error) {
        res.status(500).json({ error: "Internal server error" });
    }
};



route.get("/fetch", fetch)
route.post("/create", create)
route.post("/update/:id", update)
route.delete("/delete/:id", deleteCar)
    // In your car routes file (car-routes.js or similar)

const editCar = async(req, res) => {
    try {
        const id = req.params.id;
        const car = await Cars.findById(id);
        if (!car) {
            return res.status(404).json({ message: "Car not found" });
        }
        // Render the edit page and pass the car data to the view
        res.render('edit', { car: car });
    } catch (error) {
        res.status(500).json({ error: "Internal server error" });
    }
};

// Define the route for editing a car
route.get("/edit/:id", editCar);



export default route;