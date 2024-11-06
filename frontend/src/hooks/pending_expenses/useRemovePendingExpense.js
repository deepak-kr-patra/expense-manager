import { useState } from "react";
import useExpenses from "../../zustand/useExpenses";
import toast from "react-hot-toast";


const useRemovePendingExpense = () => {
    const [loading, setLoading] = useState(false);
    const { pendingExpenses, setPendingExpenses } = useExpenses();

    const removePendingExpense = async (pendingExpenseToRemoveId) => {
        setLoading(true);
        try {
            const res = await fetch(`/api/pending-expenses/remove/${pendingExpenseToRemoveId}`, {
                method: "DELETE",
                headers: {
                    "Content-Type": "application/json"
                }
            });

            const data = await res.json();
            if (data.error) {
                throw new Error(data.error);
            }

            const index = pendingExpenses.findIndex(pendingExpense => pendingExpense._id === pendingExpenseToRemoveId);
            if (index !== -1) {
                pendingExpenses.splice(index, 1);
            }

            setPendingExpenses(pendingExpenses);

        } catch (error) {
            toast.error(error.message);
        } finally {
            setLoading(false);
        }
    };

    return { loading, removePendingExpense };
};

export default useRemovePendingExpense;