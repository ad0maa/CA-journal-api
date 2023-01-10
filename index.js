import express from "express";
import { CategoryModel } from "./db.js";
import entryRoutes from "./routes/entry_routes.js";

const app = express();
const port = 4001;

app.use(express.json());

app.get("/", (request, response) => response.send({ info: "Journal API" }));

app.get("/categories", async (req, res) =>
  res.status(200).send(await CategoryModel.find())
);


// Prefixing entries with URI 
app.use('/entries', entryRoutes);

app.listen(port, () => console.log(`App running @ http//localhost:${port}`));
