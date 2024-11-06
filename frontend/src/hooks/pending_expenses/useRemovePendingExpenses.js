import { useState } from "react";
import useExpenses from "../../zustand/useExpenses";
import toast from "react-hot-toast";


const useRemovePendingExpenses = () => {
    const [loading, setLoading] = useState(loading);
    const { pendingExpenses, setPendingExpenses } = useExpenses();

    const removePendingExpenses = async (pendingExpensesToRemoveIDs) => {
        setLoading(true);
        try {
            for (let idx = 0; idx < pendingExpensesToRemoveIDs.length; idx++) {
                const pendingExpenseToRemoveId = pendingExpensesToRemoveIDs[idx];

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
            }
        } catch (error) {
            toast.error(error.message);
        } finally {
            setLoading(false);
        }
    };

    return { loading, removePendingExpenses };
};

export default useRemovePendingExpenses;