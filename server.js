const express = require("express");
const mongoose = require("mongoose");
const app = express();
const cors= require("cors");
app.use(cors())
app.use(express.json())
const PORT = 3030;

app.use(express.json());
mongoose.connect("mongodb+srv://harikrishna_db_:harikrishna091@cluster0.slhj7y7.mongodb.net/expenses?retryWrites=true&w=majority&appName=Cluster0")


.then(() => {
    console.log(" mongo DB Connected Successfully");
})
.catch((error) => {
    console.log(error);
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

const data = mongoose.model("data", expenseSchema);



app.post("/post", async (req, res) => {
    try {
        const { title, amount } = req.body;
        const NewExpense = new data({
            title,
            amount
        });
        await NewExpense.save();
        res.json({ message: "Expense Created Successfully", expense: NewExpense });
    } catch (error) {
        res.send({ message: "Error creating expense", error: error.message });
    }
});

app.get("/get", async(req, res) => {
    const  students = await data.find();
    res.send(students);
});
app.delete("/delete/:id", async (req, res) => {
  try {
    const { id } = req.params;
    await data.findByIdAndDelete(id);
    res.json({ message: "Expense deleted Successfully" });
  } catch (error) {
    res.status(500).json({ message: "Error deleting expense", error });
  }
});
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});



