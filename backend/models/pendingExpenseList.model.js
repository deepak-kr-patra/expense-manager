import mongoose from "mongoose";


const pendingExpenseListSchema = mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User"
    },
    pending_expenses: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Expense",
            default: []
        }
    ]
}, { timestamps: true });

const PendingExpenseList = mongoose.model('Pending_Expense_List', pendingExpenseListSchema);

export default PendingExpenseList;