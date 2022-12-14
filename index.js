import express from "express";

const categories = ["Food", "Coding", "Work", "Other"];

const entries = [
  { category: "Food", content: "Hello!" },
  { category: "Coding", content: "Express is cool!" },
  { category: "Work", content: "Another day at the office." },
];

const app = express();
const port = 4001;

app.use(express.json());

app.get("/", (request, response) => response.send({ info: "Journal API" }));
app.get("/categories", (req, res) => res.status(200).send(categories));
app.get("/entries", (req, res) => res.status(200).send(entries));
app.post("/entries", (req, res) => {
  // Create a new entry object with values passed in from the request
  const { category, content } = req.body;
  const newEntry = { category, content };
  // Push new entry object into entries array
  entries.push(newEntry);
  // Send the new entry with 201 status code
  res.status(201).send(newEntry);
});

app.get("/entries/:id", (req, res) => {
  const entry = entries[req.params.id];
  if (entry) {
    res.send(entry);
  } else {
    res.status(404).send({ error: "Entry not found" });
  }
});

app.listen(port, () => console.log(`App running @ http//localhost:${port}`));
