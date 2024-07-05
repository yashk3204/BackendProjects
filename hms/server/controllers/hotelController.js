import express from "express"
import hotelModel from "../models/hotelModel.js"
import { deleteModel } from "mongoose";
const router = express.Router()

router.get("/getAll", async (req, res) => {
    try {
        let hotels = await hotelModel.find({})
        console.log(hotels)
        res.status(200).json({hotels})
    } catch (error) {
        console.log(error)
    }
});

router.post("/addHotel", async (req, res) => {
    try {
        const {name, city, stars} = req.body;
        if(!name || !city || !stars) {
            res.status(400);
            throw new Error("All fields are mandatory");
        }
        const newHotel = await hotelModel.create({ name, city, stars })
        res.status(200).json({message: "New hotel added successfully."});
    } catch (error) {
        console.log(error)
    }
});

router.get("/:id", async (req, res) => {
    try{
        const hotel = await hotelModel.findById(req.params.id);
        if(!hotel) {
            res.status(404);
            throw new Error("Hotel not found");
        }
        res.status(200).json(hotel);
    } catch (err) {
        console.log(err);
    }
});

router.post("/insertMany", async (req, res) => {
    const docs = req.body;
    if (!Array.isArray(docs)) {
        return res.status(400).send('Input should be an array of documents');
    }
    try {
        const result = await hotelModel.insertMany(docs);
        res.status(200).json({message: `Added ${docs.length} new hotels.`});
    } catch (err) {
        console.log(err);
    }
});

router.put("/:id", async (req, res) => {
    try {
        const hotel = await hotelModel.findById(req.params.id);
        if(!hotel) {
            res.status(404);
            throw new Error("Hotel not found");
        }
        const updatedHotel = await hotelModel.findByIdAndUpdate(req.params.id, req.body, {new: true});
        res.status(200).json({message: "Hotel successfully updated."});
    } catch(err) {
        console.log(err);
    }
});

router.delete("/:id", async (req, res) => {
    try {
        const hotel = await hotelModel.findById(req.params.id);
        if(!hotel) {
            res.status(404);
            throw new Error("Hotel not found");
        }
        await hotelModel.findByIdAndDelete({ _id: req.params.id });
        res.status(200).json({message: "Hotel successfully deleted."});
    } catch(err) {
        console.log(err);
    }
});

router.delete("/deleteAll", async(req, res) => {
    try {
        await hotelModel.deleteMany();
        const hotels = await hotelModel.find({});
        res.status(200).json({message: "All hotels deleted successfully."});
    } catch(err) {
        console.log(err);
    }
});

router.get("/count", async (req, res) => {
    try {
        const count = await hotelModel.countDocuments({});
        console.log(count);
        // res.status(200).json({ms:toString(count)});
    } catch (err) {
        console.log(err);
    }
});

router.put("/replace/:id", async (req, res) => {
    try {
        const {name, city, stars} = req.body;
        await hotelModel.replaceOne({ _id: req.params.id }, {name, city, stars});
        res.status(200).json({message: "Hotel replaced successfully."});
    } catch (err) {
        console.log(err);
    }
});

export default router;