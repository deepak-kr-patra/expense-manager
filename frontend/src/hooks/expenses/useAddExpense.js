import { useState } from "react";
import useExpenses from "../../zustand/useExpenses";
import toast from "react-hot-toast";


const useAddExpense = () => {
    const [loading, setLoading] = useState(false);
    const { expenses, setExpenses, selectedExpenses, setSelectedExpenses } = useExpenses();

    const addExpense = async ({ title, amount, category, date }) => {

        const validInputs = checkExpenseInputs(title, amount, category, date);
        if (!validInputs) {
            return false;
        }

        setLoading(true);
        try {
            const res = await fetch('/api/expenses/add', {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({ title, amount, category, date })
            });

            const data = await res.json();
            if (data.error) {
                throw new Error(data.error);
            }

            setExpenses([...expenses.reverse(), data].reverse());
            setSelectedExpenses([...selectedExpenses.reverse(), data].reverse());

        } catch (error) {
            toast.error(error.message);
        } finally {
            setLoading(false);
            return true;
        }
    };

    return { loading, addExpense };
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

export default useAddExpense;