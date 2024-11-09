import { useState } from "react";
import usePendingExpenses from "../../zustand/usePendingExpenses";
import toast from "react-hot-toast";


const useUpdatePendingExpense = () => {
    const [loading, setLoading] = useState(false);
    const {
        pendingExpenses,
        setPendingExpenses,
        selectedPendingExpenses,
        setSelectedPendingExpenses
    } = usePendingExpenses();

    const updatePendingExpense = async ({ title, amount, category, date }, pendingExpenseToUpdateId) => {

        const validInputs = checkPendingExpenseInputs(title, amount, category, date);
        if (!validInputs) {
            return false;
        }

        setLoading(true);
        try {
            const res = await fetch(`/api/pending-expenses/update/${pendingExpenseToUpdateId}`, {
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

            const index = pendingExpenses.findIndex(pendingExpense => pendingExpense._id === pendingExpenseToUpdateId);
            if (index !== -1) {
                pendingExpenses.splice(index, 1, data);
            }
            const index2 = selectedPendingExpenses.findIndex(pendingExpense => pendingExpense._id === pendingExpenseToUpdateId);
            if (index2 !== -1) {
                selectedPendingExpenses.splice(index2, 1, data);
            }

            setPendingExpenses(pendingExpenses);
            setSelectedPendingExpenses(selectedPendingExpenses);

        } catch (error) {
            toast.error(error.message);
        } finally {
            setLoading(false);
            return true;
        }
    };

    return { loading, updatePendingExpense };
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

export default useUpdatePendingExpense;