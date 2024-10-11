import express from "express";
import protectRoute from "../middleware/protectRoute.js";
import {
    addPendingExpense,
    completePendingExpense,
    getPendingExpenses,
    removePendingExpense,
    updatePendingExpense
} from "../controllers/pendingExpense.controller.js";


const router = express.Router();

router.get('/', protectRoute, getPendingExpenses);
router.post('/add', protectRoute, addPendingExpense);
router.put('/update/:id', protectRoute, updatePendingExpense);
router.delete('/remove/:id', protectRoute, removePendingExpense);
router.put('/complete/:id', protectRoute, completePendingExpense);

export default router;