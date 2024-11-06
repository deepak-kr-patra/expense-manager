import { useState } from "react";
import useExpenses from "../../zustand/useExpenses";
import toast from "react-hot-toast";


const useRemoveExpense = () => {
    const [loading, setLoading] = useState(false);
    const { expenses, setExpenses, selectedExpenses, setSelectedExpenses } = useExpenses();

    const removeExpense = async (expenseToRemoveId) => {
        setLoading(true);
        try {
            const res = await fetch(`/api/expenses/remove/${expenseToRemoveId}`, {
                method: "DELETE",
                headers: {
                    "Content-Type": "application/json"
                }
            });

            const data = await res.json();
            if (data.error) {
                throw new Error(data.error);
            }

            const index = expenses.findIndex(expense => expense._id === expenseToRemoveId);
            if (index !== -1) {
                expenses.splice(index, 1);
            }
            const index2 = selectedExpenses.findIndex(expense => expense._id === expenseToRemoveId);
            if (index2 !== -1) {
                selectedExpenses.splice(index2, 1);
            }

            setExpenses(expenses);
            setSelectedExpenses(selectedExpenses);

        } catch (error) {
            toast.error(error.message);
        } finally {
            setLoading(false);
        }
    };

    return { loading, removeExpense };
};

export default useRemoveExpense;