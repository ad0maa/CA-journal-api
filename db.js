import mongoose from "mongoose"

mongoose.set('strictQuery', true)

async function dbClose(){
  await mongoose.connection.close();
  console.log("Database disconnected!");
}

// Connect to a MongoDB via Mongoose
try {
  const m = await mongoose.connect("mongodb+srv://admin:Password123@cluster0.apiqvhy.mongodb.net/journal?retryWrites=true&w=majority")
  console.log(m.connection.readyState === 1 ? 'Mongoose connected' : 'Moongose failed to connect')
}
catch (err) {
  console.log(err)
}

// Create a Mongoose schema to define the structure of a model
const entrySchema = new mongoose.Schema({
  category: { type: mongoose.ObjectId, ref: 'Category' },
  content: { type: String, required: true }
})

// Create a Mongoose model based on the schema
const EntryModel = mongoose.model('Entry', entrySchema)

const categorySchema = new mongoose.Schema({
  name: { type: String, require: true }
})

const CategoryModel = mongoose.model('Category', categorySchema)

export { EntryModel, CategoryModel, dbClose }