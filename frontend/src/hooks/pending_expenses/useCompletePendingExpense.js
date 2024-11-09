import { useState } from "react";
import useExpenses from "../../zustand/useExpenses";
import toast from "react-hot-toast";
import usePendingExpenses from "../../zustand/usePendingExpenses";


const useCompletePendingExpense = () => {
    const [loading, setLoading] = useState(false);
    const { expenses, setExpenses, selectedExpenses, setSelectedExpenses } = useExpenses();
    const {
        pendingExpenses,
        setPendingExpenses,
        selectedPendingExpenses,
        setSelectedPendingExpenses
    } = usePendingExpenses();

    const completePendingExpense = async ({ title, amount, category, date }, pendingExpenseToCompleteId) => {

        const validInputs = checkPendingExpenseInputs(title, amount, category, date);
        if (!validInputs) {
            return false;
        }

        setLoading(true);
        try {
            const res = await fetch(`/api/pending-expenses/complete/${pendingExpenseToCompleteId}`, {
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

            // removing from pending expenses
            const index = pendingExpenses.findIndex(pendingExpense => pendingExpense._id === pendingExpenseToCompleteId);
            if (index !== -1) {
                pendingExpenses.splice(index, 1);
            }
            const index2 = selectedPendingExpenses.findIndex(pendingExpense => pendingExpense._id === pendingExpenseToCompleteId);
            if (index2 !== -1) {
                selectedPendingExpenses.splice(index2, 1);
            }

            setPendingExpenses(pendingExpenses);
            setSelectedPendingExpenses(selectedPendingExpenses);

            // adding into expenses
            setExpenses([...expenses, data]);
            setSelectedExpenses([...selectedExpenses, data]);

        } catch (error) {
            toast.error(error.message);
        } finally {
            setLoading(false);
            return true;
        }
    };

    return { loading, completePendingExpense };
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

export default useCompletePendingExpense;