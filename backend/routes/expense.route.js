import express from "express";
import protectRoute from "../middleware/protectRoute.js";
import { addExpense, getExpenses, removeExpense, updateExpense } from "../controllers/expense.controller.js";


const router = express.Router();

router.get('/', protectRoute, getExpenses);
router.post('/add', protectRoute, addExpense);
router.put('/update/:id', protectRoute, updateExpense);
router.delete('/remove/:id', protectRoute, removeExpense);

export default router;