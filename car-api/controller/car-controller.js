// import Cars from "../model/car-model.js"

// export const create = async(req, res) => {
//     try {
//         const carData = new Cars(req.body);
//         const { model } = carData;
//         const carExist = await Cars.findOne({ model })
//         if (carExist) {
//             return res.status(400).json({ message: "car already exist" })
//         }
//         const savedCar = await carData.save();
//         res.status(200).json(savedCar);
//     } catch (error) {
//         res.status(500).json({
//             error: "internal server error"
//         })
//     }
// }

// export const fetch = async(req, res) => {
//     try {
//         const cars = await Cars.find()
//         if (cars === 0) {
//             return res.status(404).json({ message: "No Cars in the collection" })
//         }
//         res.status(200).json(cars)
//     } catch (error) {
//         res.status(500).json({
//             error: "internal server error"
//         })
//     }

// }

// export const update = async(req, res) => {
//     try {
//         const id = req.params.id;
//         const carExist = await Cars.findOne({ _id: id })
//         if (!carExist) {
//             return res.status(404).json({ message: "car not found" })
//         }
//         const updateCar = await Cars.findByIdAndUpdate(id, req.body, { new: true })
//         res.status(201).json(updateCar)
//     } catch (error) {
//         res.status(500).json({
//             error: "internal server error"
//         })

//     }
// }

// export const deleteCar = async(req, res) => {
//     try {
//         const id = req.params.id;
//         const carExist = await Cars.findOne({ _id: id })
//         if (!carExist) {
//             return res.status(404).json({ message: "car not found" })
//         }

//         await Cars.findByIdAndDelete(id);

//         res.status(201).json({ message: "Car deleted Successfully" })
//     } catch (error) {
//         res.status(500).json({
//             error: "internal server error"
//         })

//     }
// }