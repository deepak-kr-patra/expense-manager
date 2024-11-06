import { useState } from "react";
import useExpenses from "../../zustand/useExpenses";
import toast from "react-hot-toast";


const useUpdateExpense = () => {
    const [loading, setLoading] = useState(false);
    const { expenses, setExpenses, selectedExpenses, setSelectedExpenses } = useExpenses();

    const updateExpense = async ({ title, amount, category, date }, expenseToUpdateId) => {

        const validInputs = checkExpenseInputs(title, amount, category, date);
        if (!validInputs) {
            return false;
        }

        setLoading(true);
        try {
            const res = await fetch(`/api/expenses/update/${expenseToUpdateId}`, {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({ title, amount, category, date })
            });

            const data = await res.json();
            if (data.error) {
                throw new Error(data.error);
            }

            const index = expenses.findIndex(expense => expense._id === expenseToUpdateId);
            if (index !== -1) {
                expenses.splice(index, 1, data);
            }
            const index2 = selectedExpenses.findIndex(expense => expense._id === expenseToUpdateId);
            if (index2 !== -1) {
                selectedExpenses.splice(index2, 1, data);
            }

            setExpenses(expenses);
            setSelectedExpenses(selectedExpenses);

        } catch (error) {
            toast.error(error.message);
        } finally {
            setLoading(false);
            return true;
        }
    };

    return { loading, updateExpense };
};

const checkExpenseInputs = (title, amount, category, date) => {
    if (!title || !amount || !category || !date) {
        toast.error("Please fill in all fields");
        return false;
    }

    if (title.length < 3) {
        toast.error("Enter minimum 3 characters for title");
        return false;
    }

    if (amount <= 0) {
        toast.error("Amount must be greater than 0");
        return false;
    }

    return true;
};

export default useUpdateExpense;