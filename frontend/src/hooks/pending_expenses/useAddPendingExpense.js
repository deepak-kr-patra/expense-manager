import { useState } from "react";
import usePendingExpenses from "../../zustand/usePendingExpenses";
import toast from "react-hot-toast";


const useAddPendingExpense = () => {
    const [loading, setLoading] = useState(false);
    const {
        pendingExpenses,
        setPendingExpenses,
        selectedPendingExpenses,
        setSelectedPendingExpenses
    } = usePendingExpenses();

    const addPendingExpense = async ({ title, amount, category, date }) => {

        const validInputs = checkPendingExpenseInputs(title, amount, category, date);
        if (!validInputs) {
            return false;
        }

        setLoading(true);
        try {
            const res = await fetch('/api/pending-expenses/add', {
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

            setPendingExpenses([...pendingExpenses, data]);
            setSelectedPendingExpenses([...selectedPendingExpenses, data]);

        } catch (error) {
            toast.error(error.message);
        } finally {
            setLoading(false);
            return true;
        }
    };

    return { loading, addPendingExpense };
};

const checkPendingExpenseInputs = (title, amount, category, date) => {
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

export default useAddPendingExpense;