import { useState } from "react";
import useExpenses from "../../zustand/useExpenses";
import toast from "react-hot-toast";


const useUpdatePendingExpense = () => {
    const [loading, setLoading] = useState(false);
    const { pendingExpenses, setPendingExpenses } = useExpenses();

    const updatePendingExpense = async ({ title, amount, category, date }, pendingExpenseToUpdateId) => {
        setLoading(true);
        try {
            const res = await fetch(`/api/pending-expenses/update/${pendingExpenseToUpdateId}`, {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({title, amount, category, date})
            });

            const data = await res.json();
            if (data.error) {
                throw new Error(data.error);
            }

            const index = pendingExpenses.findIndex(pendingExpense => pendingExpense._id === pendingExpenseToUpdateId);
            if (index !== -1) {
                pendingExpenses.splice(index, 1, data);
            }

            setPendingExpenses(pendingExpenses);

        } catch (error) {
            toast.error(error.message);
        } finally {
            setLoading(false);
        }
    };

    return { loading, updatePendingExpense };
};

export default useUpdatePendingExpense;