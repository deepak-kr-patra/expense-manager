import express from "express";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
import path from "path";

import connectToMongoDB from "./db/connectToMongoDB.js";

import authRoutes from "./routes/auth.route.js";
import expenseRoutes from "./routes/expense.route.js";
import pendingExpenseRoutes from "./routes/pendingExpense.route.js";


dotenv.config();

const __dirname = path.resolve();

const app = express();
const PORT = process.env.PORT || 5000;

app.use(express.json());
app.use(cookieParser());

app.use('/api/auth', authRoutes);
app.use('/api/expenses', expenseRoutes);
app.use('/api/pending-expenses', pendingExpenseRoutes);

app.use(express.static(path.join(__dirname, "/frontend/dist")));

app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, "frontend", "dist", "index.html"));
});

app.listen(PORT, () => {
    connectToMongoDB();
    console.log(`Expense Manager server listening on port ${PORT}`);
});