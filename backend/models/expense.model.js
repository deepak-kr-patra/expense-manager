import mongoose from "mongoose";


const expenseSchema = mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User"
    },
    title: {
        type: String,
        required: true,
        minlength: 3
    },
    amount: {
        type: Number,
        required: true
    },
    category: {
        type: String,
        required: true,
        enum: ["food", "clothing", "personal", "mobile", "fuel", "others"]
    },
    date: {
        type: Date,
        required: true
    },
    state: {
        type: String,
        required: true,
        enum: ["pending", "completed"]
    }
}, { timestamps: true });

const Expense = mongoose.model('Expense', expenseSchema);

export default Expense;