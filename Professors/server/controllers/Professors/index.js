import express from "express";
const router = express.Router();
import profModel from "../../models/Professors/professors.js";

router.get('/getall', async (req, res) => {
  try {
    let profs = await profModel.find({});
    res.status(200).json({profs});
  } catch (error) {
    res.status(500).json({ message: error });
  }
});

router.get('/getById/:id', async (req, res) => {
    try {
      const prof = await profModel.findById(req.params.id);
      if(!prof) {
        res.status(404);
        throw new Error("Professor not found.");
      }
      res.status(200).json(prof);
    } catch (error) {
      res.status(500).json({ message: error });
    }
});

router.get("/count", async (req, res) => {
    try {
        const count = await profModel.countDocuments({});
        res.status(200).json({ message: `There are ${count} professors.` });
    } catch (err) {
        console.log(err);
    }
});

router.post('/add', async (req, res) => {
    try {
        const prof = req.body;
        await profModel.create(prof);
        res.status(200).json({ message: "New professor added successfully." })
    } catch (error) {
      res.status(500).json({ message: error });
    }
});

router.post('/addmany', async (req, res) => {
    const profs = req.body;
    if(!Array.isArray(profs)) {
        return res.status(400).json({ message: "Input must be an array of professors." })
    }
    try {
        await profModel.insertMany(profs);
        res.status(200).json({ message: `Added ${profs.length} new professors.` });
    } catch (error) {
      res.status(500).json({ message: error });
    }
});

router.put('/update/:id', async (req, res) => {
    try {
        const prof = await profModel.findById(req.params.id);
        if(!prof) {
          res.status(404);
          throw new Error("Professor not found.");
        }
        await profModel.findByIdAndUpdate(req.params.id, req.body, {new: true});
        res.status(200).json({ message: "Professor updated successfully." })
    } catch (error) {
      res.status(500).json({ message: error });
    }
});

router.put('/replace/:id', async (req, res) => {
    try {
        await profModel.replaceOne({ _id: req.params.id }, req.body);
        res.status(200).json({ message: "Professor replaced successfully."});
    } catch (err) {
        console.log(err);
    }
});

router.delete('/delete/:id', async (req, res) => {
    try {
        const prof = await profModel.findById(req.params.id);
        if(!prof) {
          res.status(404);
          throw new Error("Professor not found.");
        }
        await profModel.findByIdAndDelete({ _id: req.params.id });
        res.status(200).json({ message: "Professor deleted successfully." });
    } catch (err) {
        console.log(err);
    }
});

router.delete('/deleteAll', async (req, res) => {
    try {
        await profModel.deleteMany();
        res.status(200).json({ message: "All professors deleted."});
    } catch (err) {
        console.log(err);
    }
});

export default router;