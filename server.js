const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const app = express();
const PORT = 5000;
app.use(cors());
app.use(express.json());

mongoose.connect("mongodb+srv://harikrishna_db_user:harikrishna0916@cluster0.kbqda6z.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0")
  .then(() => {
    console.log("Connected to MongoDB");
  })
  .catch((error) => {
    console.log("Error connecting to MongoDB:", error);
  });

const expenseSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true
  },
  amount: {
    type: Number,
    required: true
  }
});
const Expense = mongoose.model("Expense", expenseSchema);


app.post("/post", async (req, res) => {
  try {
    const { title, amount } = req.body;
    const newExpense = new Expense({ title, amount });
    await newExpense.save();
    res.json({ message: "Expense created successfully", expense: newExpense });
  } catch (error) {
    res.json({ message: "Error creating expense", error: error.message });
  }
});

app.get("/get", async (req, res) => {
  try {
    const expenses = await Expense.find();
    res.json({ message: "Expenses fetched successfully", expenses });
  } catch (error) {
    res.json({ message: "Error fetching expenses", error: error.message });
  }
});

app.delete("/delete/:id" , async(req,res)=>{
  try{
    const {id} = req.params;
    await Expense.findByIdAndDelete(id);
    res.json({message : "Deleted Successfully"});
  }
  catch(err){
    return res.send({message : "Error Deleting", error: err.message});
  }
})


app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});