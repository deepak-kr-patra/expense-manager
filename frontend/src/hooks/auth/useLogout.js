import { useState } from "react";
import useAuthUser from "../../zustand/useAuthUser";
import toast from "react-hot-toast";


const useLogout = () => {
    const { setAuthUser } = useAuthUser();
    const [loading, setLoading] = useState(false);

    const logout = async () => {
        setLoading(true);
        try {
            const res = await fetch('/api/auth/logout', {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                }
            });

            const data = await res.json();
            if (data.error) {
                throw new Error(data.error);
            }

            localStorage.removeItem("authenticated-user");
            setAuthUser(null);

        } catch (error) {
            toast.error(error.message);
        } finally {
            setLoading(false);
        }
    };

    return { loading, logout };
};

export default useLogout;