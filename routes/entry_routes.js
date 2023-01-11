import express from "express";
import { EntryModel, CategoryModel } from "../db.js";

const router = express.Router();

router.get("/", async (req, res) =>
  res.send(
    await EntryModel.find().populate({
      path: "category",
      select: ["name"],
    })
  )
);

router.get("/food", async (req, res) =>
  res.send(await EntryModel.find({ category: "Food" }))
);

// POST new entry to the database
router.post("/", async (req, res) => {
  try {
    // Create a new entry object with values passed in from the request
    const { category, content } = req.body;
    const categoryObject = await CategoryModel.findOne({ name: category });
    const newEntry = { category: categoryObject._id, content };
    // Push new entry object into entries array
    const insertedEntry = await EntryModel.create(newEntry);
    // Send the new entry with 201 status code
    res.status(201).send(
      await insertedEntry.populate({
        path: "category",
        select: "name",
      })
    );
  } catch (err) {
    res.status(500).send({ error: err.message });
  }
});

// GET a single entry from the database by id
router.get("/:id", async (req, res) => {
  try {
    const entry = await EntryModel.findById(req.params.id).populate({
      path: "category",
      select: ["name"],
    });
    if (entry) {
      res.send(entry);
    } else {
      res.status(404).send({ error: "Entry not found" });
    }
  } catch (err) {
    res.status(500).send({ error: err.message });
  }
});

// PUT Update an entry

router.put("/:id", async (req, res) => {
  const { category, content } = req.body;
  const newEntry = { category, content };

  try {
    const entry = await EntryModel.findByIdAndUpdate(req.params.id, newEntry, {
      returnDocument: "after",
    });
    if (entry) {
      res.send(entry);
    } else {
      res.status(404).send({ error: "Entry not found" });
    }
  } catch (err) {
    res.status(500).send({ error: err.message });
  }
});

// Delete an entry

router.delete("/:id", async (req, res) => {
  try {
    const entry = await EntryModel.findByIdAndDelete(req.params.id);
    if (entry) {
      res.sendStatus(204);
    } else {
      res.status(404).send({ error: "Entry not found" });
    }
  } catch (err) {
    res.status(500).send({ error: err.message });
  }
});

export default router;
