import { create } from 'zustand';


const useAuthUser = create((set) => ({
    authUser: JSON.parse(localStorage.getItem("authenticated-user")) || null,
    setAuthUser: (authUser) => set({ authUser })
}));

export default useAuthUser;