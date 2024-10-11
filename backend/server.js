import express from "express";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";

import connectToMongoDB from "./db/connectToMongoDB.js";

import authRoutes from "./routes/auth.route.js";
import expenseRoutes from "./routes/expense.route.js";
import pendingExpenseRoutes from "./routes/pendingExpense.route.js";


dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

app.use(express.json());
app.use(cookieParser());

app.use('/api/auth', authRoutes);
app.use('/api/expenses', expenseRoutes);
app.use('/api/pending-expenses', pendingExpenseRoutes);

app.listen(PORT, () => {
    connectToMongoDB();
    console.log(`Expense Manager server listening on port ${PORT}`);
});