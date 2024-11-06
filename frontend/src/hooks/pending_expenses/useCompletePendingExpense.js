import { useState } from "react";
import useExpenses from "../../zustand/useExpenses";
import toast from "react-hot-toast";


const useCompletePendingExpense = () => {
    const [loading, setLoading] = useState(false);
    const { expenses, setExpenses, pendingExpenses, setPendingExpenses } = useExpenses();

    const completePendingExpense = async (date, pendingExpenseToCompleteId) => {
        setLoading(true);
        try {
            const res = await fetch(`/api/pending-expenses/complete/${pendingExpenseToCompleteId}`, {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({ date })
            });

            const data = await res.json();
            if (data.error) {
                throw new Error(data.error);
            }

            const index = pendingExpenses.findIndex(pendingExpense => pendingExpense._id === pendingExpenseToCompleteId);
            if (index !== -1) {
                pendingExpenses.splice(index, 1);
            }

            setPendingExpenses(pendingExpenses);

            setExpenses([...expenses, data]);

        } catch (error) {
            toast.error(error.message);
        } finally {
            setLoading(false);
        }
    };

    return { loading, completePendingExpense };
};

export default useCompletePendingExpense;