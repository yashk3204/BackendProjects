import express from "express";
const router = express.Router();
import movieModel from "../../models/Movies/movies.js";

router.get('/getall', async (req, res) => {
  try {
    let movies = await movieModel.find({});
    res.status(200).json({movies});
  } catch (error) {
    res.status(500).json({ message: error });
  }
});

router.get('/getById/:id', async (req, res) => {
    try {
      const movie = await movieModel.findById(req.params.id);
      if(!movie) {
        res.status(404);
        throw new Error("Movie not found.");
      }
      res.status(200).json(movie);
    } catch (error) {
      res.status(500).json({ message: error });
    }
});

router.get("/count", async (req, res) => {
    try {
        const count = await movieModel.countDocuments({});
        res.status(200).json({ message: `There are ${count} movies.`});
    } catch (err) {
        console.log(err);
    }
});

router.post('/add', async (req, res) => {
    try {
        const movie = req.body;
        await movieModel.create(movie);
        res.status(200).json({ message: "New movie added successfully." })
    } catch (error) {
      res.status(500).json({ message: error });
    }
});

router.post('/addmany', async (req, res) => {
    const movies = req.body;
    if(!Array.isArray(movies)) {
        return res.status(400).json({ message: "Input must be an array of movies." })
    }
    try {
        await movieModel.insertMany(movies);
        res.status(200).json({ message: `Added ${movies.length} new movies.` });
    } catch (error) {
      res.status(500).json({ message: error });
    }
});

router.put('/update/:id', async (req, res) => {
    try {
        const movie = await movieModel.findById(req.params.id);
        if(!movie) {
          res.status(404);
          throw new Error("Movie not found.");
        }
        await movieModel.findByIdAndUpdate(req.params.id, req.body, {new: true});
        res.status(200).json({ message: "Movie updated successfully." })
    } catch (error) {
      res.status(500).json({ message: error });
    }
});

router.put('/replace/:id', async (req, res) => {
    try {
        await movieModel.replaceOne({ _id: req.params.id }, req.body);
        res.status(200).json({ message: "Movie replaced successfully."});
    } catch (err) {
        console.log(err);
    }
});

router.delete('/delete/:id', async (req, res) => {
    try {
        const movie = await movieModel.findById(req.params.id);
        if(!movie) {
          res.status(404);
          throw new Error("Movie not found.");
        }
        await movieModel.findByIdAndDelete({ _id: req.params.id });
        res.status(200).json({ message: "Movie deleted successfully." });
    } catch (err) {
        console.log(err);
    }
});

router.delete('/deleteAll', async (req, res) => {
    try {
        await movieModel.deleteMany();
        res.status(200).json({ message: "All movies deleted."});
    } catch (err) {
        console.log(err);
    }
});

export default router;