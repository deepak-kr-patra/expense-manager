import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import useExpenses from "../../zustand/useExpenses";


const useGetPendingExpenses = () => {
    const [loading, setLoading] = useState(false);
    const { pendingExpenses, setPendingExpenses } = useExpenses();

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

            } catch (error) {
                toast.error(error.message);
            } finally {
                setLoading(false);
            }
        };
        getPendingExpenses();
    },[]);

    return { loading, pendingExpenses };
};

export default useGetPendingExpenses;