import { create } from 'zustand';


const usePendingExpenses = create((set) => ({
    pendingExpenses: [],
    setPendingExpenses: (pendingExpenses) => set({ pendingExpenses }),
    selectedPendingExpenses: [],
    setSelectedPendingExpenses: (selectedPendingExpenses) => set({ selectedPendingExpenses }),
    pendingExpenseToRemoveId: null,
    setPendingExpenseToRemoveId: (pendingExpenseToRemoveId) => set({ pendingExpenseToRemoveId }),
    pendingExpenseToUpdate: {},
    setPendingExpenseToUpdate: (pendingExpenseToUpdate) => set({ pendingExpenseToUpdate }),
    pendingExpenseToComplete: {},
    setPendingExpenseToComplete: (pendingExpenseToComplete) => set({ pendingExpenseToComplete })
}));

export default usePendingExpenses;