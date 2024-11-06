import { useState } from "react";
import useExpenses from "../../zustand/useExpenses";
import toast from "react-hot-toast";


const useAddPendingExpense = () => {
    const [loading, setLoading] = useState(false);
    const { pendingExpenses, setPendingExpenses } = useExpenses();

    const addPendingExpense = async ({ title, amount, category, date }) => {
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

        } catch (error) {
            toast.error(error.message);
        } finally {
            setLoading(false);
        }
    };

    return { loading, addPendingExpense };
};

export default useAddPendingExpense;