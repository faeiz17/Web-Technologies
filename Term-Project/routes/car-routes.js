import express from "express"
import Cars from "../model/car-model.js"
import checkAuth from "../middlewares/check-auth.js"


const route = express.Router()





const create = async(req, res) => {
    console.log(req.body);
    try {
        const { name, model, year, price, zto60, speed, image, description, range, rearLuggage, color, horsepower, category } = req.body;

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
        const carData = new Cars({ name, model, year, price, zto60, speed, image, description, range, rearLuggage, color, horsepower, category });

        // Save the new car to the database
        const savedCar = await carData.save();

        // Redirect to the fetch route after successful creation
        return res.redirect("/admin/cars");
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
        res.render('cars', { cars: cars, layout: 'adminLayout' });
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
        res.redirect("/admin/cars");
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
        res.redirect("/admin/cars");
    } catch (error) {
        res.status(500).json({ error: "Internal server error" });
    }
};
const fetchCars = async(req, res) => {
    try {
        const cars = await Cars.find();
        if (cars.length === 0) { // Updated the condition to check the length of cars array
            return res.status(404).json({ message: "No Cars in the collection" });
        }
        res.status(200).json(cars); // Send cars as JSON response
    } catch (error) {
        res.status(500).json({
            error: "internal server error"
        });
    }
};
route.get("/show-all-models", function(req, res) {
    res.render("allmodels", { layout: "layout" })
})

route.get("/all-models", fetchCars);

route.get("/admin/cars", checkAuth, fetch);
route.post("/admin/cars/create", create)
route.post("/admin/cars/update/:id", update)
route.post("/admin/cars/delete/:id", deleteCar)
    // In your car routes file (car-routes.js or similar)

const editCar = async(req, res) => {
    try {
        const id = req.params.id;
        const car = await Cars.findById(id);
        if (!car) {
            return res.status(404).json({ message: "Car not found" });
        }
        // Render the edit page and pass the car data to the view
        res.render('edit', { car: car, layout: 'adminLayout' });
    } catch (error) {
        res.status(500).json({ error: "Internal server error" });
    }
};

// Define the route for editing a car
route.get("/admin/cars/edit/:id", editCar);

route.get('/homepage', function(req, res) {

    res.render('homepage', { layout: 'layout' })
})

route.get("/homepage/model", async function(req, res) {
    try {
        // Get the car names from the query parameters
        const names = req.query.names ? req.query.names.split(",") : [];

        // Perform the database query with the provided names
        const cars = await Cars.find({
            name: { $in: names }
        });

        console.log(cars);
        res.render("pages/model", { layout: "layout", cars: cars });
    } catch (err) {
        console.error("Error fetching cars:", err);
        res.status(500).send("Internal Server Error");
    }
});

route.get("/contact-us", function(req, res) {
    res.render("pages/contact-us", {

        layout: "layout",
    })
})
route.get("/porsche/center", function(req, res) {
    res.render("pages/map", { layout: "layout", })
})
route.get("/news/maccan", function(req, res) {
    res.render("pages/front-news", { layout: "layout", Heading: "The new electric maccan", firstcarimage: "https://images-porsche.imgix.net/-/media/F44BDF5A72164B019EA267F0FB7051F3_6C7B7BF3D5AB480CAC00F2CD5FFBC453_macan-turbo-front?w=704&q=85&auto=format", secondcarimage: "https://images-porsche.imgix.net/-/media/F44BDF5A72164B019EA267F0FB7051F3_6C7B7BF3D5AB480CAC00F2CD5FFBC453_macan-turbo-front?w=704&q=85&auto=format", thirdcarimage: "https://images-porsche.imgix.net/-/media/F44BDF5A72164B019EA267F0FB7051F3_6C7B7BF3D5AB480CAC00F2CD5FFBC453_macan-turbo-front?w=704&q=85&auto=format" })
})
route.get('/cart', async(req, res) => {
    let cart = req.cookies.cart ? JSON.parse(req.cookies.cart) : [];

    try {
        const cartItems = await Cars.find({ _id: { $in: cart } });
        console.log(cartItems);
        res.render('cart', { cartItems, layout: "layout" });
    } catch (error) {
        console.error(error);
        res.status(500).send('Internal Server Error');
    }
});

route.post('/add-to-cart', (req, res) => {
    const carId = req.body.carId;
    let cart = req.cookies.cart ? JSON.parse(req.cookies.cart) : [];

    cart.push(carId);
    res.cookie('cart', JSON.stringify(cart), { httpOnly: true });
    res.send({ success: true });
});
route.post('/remove-from-cart', (req, res) => {
    const carId = req.body.carId;
    let cart = req.cookies.cart ? JSON.parse(req.cookies.cart) : [];

    // Remove the carId from the cart array
    cart = cart.filter(id => id !== carId);

    // Update the cart cookie
    res.cookie('cart', JSON.stringify(cart), { httpOnly: true });

    // Send success response
    res.send({ success: true });
});


route.get("/news/future", function(req, res) {
    res.render("pages/front-news", {
        layout: "layout",
        Heading: "Future",
        firstcarimage: "https://files.porsche.com/filestore/image/multimedia/none/innovation-missione-margin-01/normal/337fc63c-1b8f-11e8-bbc5-0019999cd470;s6/porsche-normal.jpg",

        secondcarimage: "https://files.porsche.com/filestore/image/multimedia/none/innovation-missione-editorial-l/normal/be34c292-1bbe-11e8-bbc5-0019999cd470;sM;twebp/porsche-normal.webp",
        thirdcarimage: "https://files.porsche.com/filestore/galleryimagerwd/multimedia/none/innovation-missione-gallery-02/zoom2/58724bda-1bbb-11e8-bbc5-0019999cd470;sR;twebp/porsche-zoom2.webp"
    })
})


route.get("/news/history", function(req, res) {
    res.render("pages/front-news", {
        layout: "layout",
        Heading: "The Porsche History",
        firstcarimage: "https://files.porsche.com/filestore/galleryimagerwd/multimedia/none/innovation-missione-gallery-02/zoom2/58724bda-1bbb-11e8-bbc5-0019999cd470;sR;twebp/porsche-zoom2.webp",

        secondcarimage: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTOp0ZxDarDBZ1ZXRd30bVbfgONyZsQTslfrGvpHCdLnQ&s",
        thirdcarimage: "https://image.cnbcfm.com/api/v1/image/106074686-15656332405521939-porsche-type-64_--jack-schroeder-c-2019-courtesy-of-rm-sothebys.jpg?v=1565633278"
    })
})


route.get("/search", async function(req, res) {
    try {
        const names = req.query.names;
        let history = req.cookies.history
        if (!history) {
            history = []
        }
        history.push(names)
        res.cookie("history", history)

        // Perform the database query with the provided names
        const cars = await Cars.find({
            name: { $regex: names, $options: 'i' }
        });

        console.log(cars);
        res.render("pages/model", { layout: "layout", cars: cars });

    } catch (error) {
        console.error(error);
        res.status(500).send('Internal Server Error');
    }
})

export default route;