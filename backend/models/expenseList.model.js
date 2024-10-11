import mongoose from "mongoose";


const expenseListSchema = mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User"
    },
    expenses: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Expense",
            default: []
        }
    ]
}, { timestamps: true });

const ExpenseList = mongoose.model('Expense_List', expenseListSchema);

export default ExpenseList;