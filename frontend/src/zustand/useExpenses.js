import { create } from 'zustand';


const useExpenses = create((set) => ({
    expenses: [],
    setExpenses: (expenses) => set({ expenses }),
    selectedExpenses: [],
    setSelectedExpenses: (selectedExpenses) => set({ selectedExpenses }),
    expenseToRemoveId: null,
    setExpenseToRemoveId: (expenseToRemoveId) => set({ expenseToRemoveId }),
    expenseToUpdate: {},
    setExpenseToUpdate: (expenseToUpdate) => set({ expenseToUpdate })
}));

export default useExpenses;