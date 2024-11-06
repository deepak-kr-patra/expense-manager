import Expense from "../models/expense.model.js";
import ExpenseList from "../models/expenseList.model.js";


export const getExpenses = async (req, res) => {
    try {
        const userId = req.user._id;

        const expenseList = await ExpenseList.findOne({ user: userId }).populate("expenses");

        if (!expenseList) {
            return res.status(200).json([]);
        }

        const expenses = expenseList.expenses;
        res.status(200).json(expenses);

    } catch (error) {
        console.log("Error in getExpenses", error.message);
        res.status(500).json({ error: "Internal server error" });
    }
};

export const addExpense = async (req, res) => {
    try {
        const userId = req.user._id;
        const { title, amount, category, date } = req.body;

        let expenseList = await ExpenseList.findOne({ user: userId });

        if (!expenseList) {
            expenseList = await new ExpenseList({
                user: userId
            });
        }

        const newExpense = await new Expense({
            user: userId,
            title,
            amount,
            category,
            date: date ? new Date(date) : new Date(),
            status: "spent"
        });

        if (newExpense) {
            expenseList.expenses.push(newExpense._id);
        }

        // await Promise.all([newExpense.save(), expenseList.save()]);
        await newExpense.save();
        await expenseList.save();

        res.status(201).json(newExpense);

    } catch (error) {
        console.log("Error in addExpense", error.message);
        res.status(500).json({ error: "Internal server error" });
    }
};

export const updateExpense = async (req, res) => {
    try {
        const userId = req.user._id;
        const { id: expenseToUpdateId } = req.params;
        const { title, amount, category, date } = req.body;

        const expenseToUpdate = await Expense.findById(expenseToUpdateId);

        if (!expenseToUpdate) {
            return res.status(404).json({ error: "Expense Not Found" });
        }

        if (userId.toString() !== expenseToUpdate.user.toString()) {
            return res.status(401).json({ error: "Unauthorized - Invalid User" });
        }

        const newExpense = {
            title,
            amount,
            category,
            date: date ? new Date(date) : expenseToUpdate.date
        };

        let updatedExpense = await Expense.findByIdAndUpdate(expenseToUpdateId, { $set: newExpense }, { new: true });

        res.status(200).json(updatedExpense);

    } catch (error) {
        console.log("Error in updateExpense", error.message);
        res.status(500).json({ error: "Internal server error" });
    }
};

export const removeExpense = async (req, res) => {
    try {
        // removing the expense from expenses collection
        const userId = req.user._id;
        const { id: expenseToRemoveId } = req.params;

        const expenseToRemove = await Expense.findById(expenseToRemoveId);

        if (!expenseToRemove) {
            return res.status(404).json({ error: "Expense Not Found" });
        }

        if (userId.toString() !== expenseToRemove.user.toString()) {
            return res.status(401).json({ error: "Unauthorized - Invalid User" });
        }

        await Expense.findByIdAndDelete(expenseToRemoveId);

        // removing the expense id from expenses array of expenseList collection
        const expenseList = await ExpenseList.findOne({ user: userId });

        expenseList.expenses.pull(expenseToRemoveId);

        const newExpenseList = {
            expenses: expenseList.expenses
        };

        await ExpenseList.findByIdAndUpdate(expenseList._id, { $set: newExpenseList }, { new: true });

        res.status(200).json(expenseToRemove);

    } catch (error) {
        console.log("Error in removeExpense", error.message);
        res.status(500).json({ error: "Internal server error" });
    }
};