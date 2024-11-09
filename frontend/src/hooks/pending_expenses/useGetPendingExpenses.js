import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import usePendingExpenses from "../../zustand/usePendingExpenses";


const useGetPendingExpenses = () => {
    const [loading, setLoading] = useState(false);
    const {
        setPendingExpenses,
        selectedPendingExpenses,
        setSelectedPendingExpenses
    } = usePendingExpenses();

    useEffect(() => {
        const getPendingExpenses = async () => {
            setLoading(true);
            try {
                const res = await fetch('/api/pending-expenses', {
                    method: "GET",
                    headers: {
                        "Content-Type": "application/json"
                    }
                });

                const data = await res.json();
                if (data.error) {
                    throw new Error(data.error);
                }

                setPendingExpenses(data);
                setSelectedPendingExpenses(data);

            } catch (error) {
                toast.error(error.message);
            } finally {
                setLoading(false);
            }
        };
        getPendingExpenses();
    }, []);

    return { loading, selectedPendingExpenses };
};

export default useGetPendingExpenses;