import express from "express";
import mongoose from "mongoose";

const categories = ["Food", "Coding", "Work", "Other"];

// const entries = [
//   { category: "Food", content: "Hello!" },
//   { category: "Coding", content: "Express is cool!" },
//   { category: "Work", content: "Another day at the office." },
// ];

// Connect to MongoDB via Mongoose
mongoose.connect('mongodb+srv://admin:Password123@cluster0.apiqvhy.mongodb.net/journal?retryWrites=true&w=majority')
  .then((m) => m.connection.readyState === 1 ? console.log('Mongoose Connected!') : console.log('Mongoose failed to connect.'))
  .catch((err) => console.log(err));


// Create a Mongoose schema to define the structure of the model
  const entrySchema = new mongoose.Schema({
    category: {type: String, required: true},
    content: {type: String, required: true}
  });

// create categories schema


// Create a Mongoose model based on the schema
const EntryModel = mongoose.model('Entry', entrySchema);


const app = express();
const port = 4001;

app.use(express.json());

app.get("/", (request, response) => response.send({ info: "Journal API" }));


app.get("/categories", (req, res) => res.status(200).send(categories));


app.get("/entries", async (req, res) => res.send(await EntryModel.find()));

app.get("/entries/food", async (req, res) => res.send(await EntryModel.find({category: "Food"})));

// POST new entry to the database
app.post("/entries", async (req, res) => {
  
  try {
  // Create a new entry object with values passed in from the request
  const { category, content } = req.body;
  const newEntry = { category, content };
  // Push new entry object into entries array
  const insertedEntry = await EntryModel.create(newEntry);
  // Send the new entry with 201 status code
  res.status(201).send(insertedEntry);
}
catch (err) {
  res.status(500).send({ error: err.message });
}
})


app.get("/entries/:id", async (req, res) => {
  try {
    const entry = await EntryModel.findById(req.params.id);
  if (entry) {
    res.send(entry);
  } else {
    res.status(404).send({ error: "Entry not found" });
  }
}
catch (err) {
  res.status(500).send({ error: err.message });
}});



// Insert a new entry into an array
// app.post("/entries", (req, res) => {
//   // Create a new entry object with values passed in from the request
//   const { category, content } = req.body;
//   const newEntry = { category, content };
//   // Push new entry object into entries array
//   entries.push(newEntry);
//   // Send the new entry with 201 status code
//   res.status(201).send(newEntry);
// });

// app.get("/entries/:id", (req, res) => {
//   const entry = entries[req.params.id];
//   if (entry) {
//     res.send(entry);
//   } else {
//     res.status(404).send({ error: "Entry not found" });
//   }
// });

app.listen(port, () => console.log(`App running @ http//localhost:${port}`));
