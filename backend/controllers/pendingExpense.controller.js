import Expense from "../models/expense.model.js";
import ExpenseList from "../models/expenseList.model.js";
import PendingExpenseList from "../models/pendingExpenseList.model.js";


export const getPendingExpenses = async (req, res) => {
    try {
        const userId = req.user._id;

        const pendingExpenseList = await PendingExpenseList.findOne({ user: userId }).populate("pending_expenses");

        if (!pendingExpenseList) {
            return res.status(200).json([]);
        }

        const pendingExpenses = pendingExpenseList.pending_expenses;
        res.status(200).json(pendingExpenses);

    } catch (error) {
        console.log("Error in getPendingExpenses", error.message);
        res.status(500).json({ error: "Internal Server Error" });
    }
};

export const addPendingExpense = async (req, res) => {
    try {
        const userId = req.user._id;
        const { title, amount, category, date } = req.body;

        let pendingExpenseList = await PendingExpenseList.findOne({ user: userId });

        if (!pendingExpenseList) {
            pendingExpenseList = await new PendingExpenseList({
                user: userId
            });
        }

        const newPendingExpense = await new Expense({
            user: userId,
            title,
            amount,
            category,
            date: date ? new Date(date) : new Date(),
            state: "pending"
        });

        if (newPendingExpense) {
            pendingExpenseList.pending_expenses.push(newPendingExpense._id);
        }

        await newPendingExpense.save();
        await pendingExpenseList.save();

        res.status(201).json(newPendingExpense);

    } catch (error) {
        console.log("Error in addPendingExpense", error.message);
        res.status(500).json({ error: "Internal Server Error" });
    }
};

export const updatePendingExpense = async (req, res) => {
    try {
        const userId = req.user._id;
        const { id: pendingExpenseToUpdateId } = req.params;
        const { title, amount, category, date } = req.body;

        const pendingExpenseToUpdate = await Expense.findById(pendingExpenseToUpdateId);

        if (!pendingExpenseToUpdate) {
            return res.status(404).json({ error: "Expense Not Found" });
        }

        if (userId.toString() !== pendingExpenseToUpdate.user.toString()) {
            return res.status(401).json({ error: "Unauthorized - Invalid User" });
        }

        const newPendingExpense = {
            title,
            amount,
            category,
            date: date ? new Date(date) : pendingExpenseToUpdate.date,
            state: "pending"
        };

        let updatedPendingExpense = await Expense.findByIdAndUpdate(pendingExpenseToUpdateId, { $set: newPendingExpense }, { new: true });

        res.status(200).json(updatedPendingExpense);

    } catch (error) {
        console.log("Error in updatePendingExpense", error.message);
        res.status(500).json({ error: "Internal Server Error" });
    }
};

export const removePendingExpense = async (req, res) => {
    try {
        // removing the pending expense from expenses collection
        const userId = req.user._id;
        const { id: pendingExpenseToRemoveId } = req.params;

        const pendingExpenseToRemove = await Expense.findById(pendingExpenseToRemoveId);

        if (!pendingExpenseToRemove) {
            return res.status(404).json({ error: "Expense Not Found" });
        }

        if (userId.toString() !== pendingExpenseToRemove.user.toString()) {
            return res.status(401).json({ error: "Unauthorized - Invalid User" });
        }

        await Expense.findByIdAndDelete(pendingExpenseToRemoveId);

        // removing the pending expense id from pending_expenses array of pendingExpenseList collection
        const pendingExpenseList = await PendingExpenseList.findOne({ user: userId });

        pendingExpenseList.pending_expenses.pull(pendingExpenseToRemoveId);

        const newPendingExpenseList = {
            pending_expenses: pendingExpenseList.pending_expenses
        };

        await PendingExpenseList.findByIdAndUpdate(pendingExpenseList._id, { $set: newPendingExpenseList }, { new: true });

        res.status(200).json(pendingExpenseToRemove);

    } catch (error) {
        console.log("Error in removePendingExpense", error.message);
        res.status(500).json({ error: "Internal Server Error" });
    }
};

export const completePendingExpense = async (req, res) => {
    try {
        // changing the state of expense from pending to completed
        const userId = req.user._id;
        const { id: pendingExpenseToCompleteId } = req.params;
        const { date } = req.body;

        const pendingExpenseToComplete = await Expense.findById(pendingExpenseToCompleteId);

        if (!pendingExpenseToComplete) {
            return res.status(404).json({ error: "Expense Not Found" });
        }

        if (userId.toString() !== pendingExpenseToComplete.user.toString()) {
            return res.status(401).json({ error: "Unauthorized - Invalid User" });
        }

        const newCompletedExpense = {
            date: date ? new Date(date) : pendingExpenseToComplete.date,
            state: "completed"
        };

        let updatedCompletedExpense = await Expense.findByIdAndUpdate(pendingExpenseToCompleteId, { $set: newCompletedExpense }, { new: true });

        // removing the expense id from pendingExpenseList collection
        const pendingExpenseList = await PendingExpenseList.findOne({ user: userId });

        pendingExpenseList.pending_expenses.pull(pendingExpenseToCompleteId);

        const newPendingExpenseList = {
            pending_expenses: pendingExpenseList.pending_expenses
        };

        await PendingExpenseList.findByIdAndUpdate(pendingExpenseList._id, { $set: newPendingExpenseList }, { new: true });

        // adding the expense id into expenseList collection
        let expenseList = await ExpenseList.findOne({user: userId});

        if (!expenseList) {
            expenseList = await new ExpenseList({
                user: userId
            });
        }

        expenseList.expenses.push(pendingExpenseToCompleteId);

        await expenseList.save();

        res.status(200).json(updatedCompletedExpense);

    } catch (error) {
        console.log("Error in completePendingExpense", error.message);
        res.status(500).json({ error: "Internal Server Error" });
    }
};