import { create } from 'zustand';


const useExpenses = create((set) => ({
    expenses: [],
    setExpenses: (expenses) => set({ expenses }),
    selectedExpenses: [],
    setSelectedExpenses: (selectedExpenses) => set({ selectedExpenses }),
    pendingExpenses: [],
    setPendingExpenses: (pendingExpenses) => set({ pendingExpenses }),
    expenseToRemoveId: null,
    setExpenseToRemoveId: (expenseToRemoveId) => set({ expenseToRemoveId }),
    expenseToUpdate: {},
    setExpenseToUpdate: (expenseToUpdate) => set({ expenseToUpdate })
}));

export default useExpenses;