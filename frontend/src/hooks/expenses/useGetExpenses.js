import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import useExpenses from "../../zustand/useExpenses";


const useGetExpenses = () => {
    const [loading, setLoading] = useState(false);
    const { expenses, setExpenses, selectedExpenses, setSelectedExpenses } = useExpenses();

    useEffect(() => {
        const getExpenses = async () => {
            setLoading(true);
            try {
                const res = await fetch('/api/expenses', {
                    method: "GET",
                    headers: {
                        "Content-Type": "application/json"
                    }
                });
    
                const data = await res.json();
                if (data.error) {
                    throw new Error(data.error);
                }
    
                setExpenses(data);
                setSelectedExpenses(data);
    
            } catch (error) {
                toast.error(error.message);
            } finally {
                setLoading(false);
            }
        };
        getExpenses();
    }, []);

    return { loading, expenses, selectedExpenses };
};

export default useGetExpenses;