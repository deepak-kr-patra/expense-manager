import { PlusIcon } from "@heroicons/react/24/outline"
import usePendingExpenses from "../../zustand/usePendingExpenses"
import SearchPendingExpenses from "./SearchPendingExpenses"
import PendingExpensesTable from "./PendingExpensesTable"

import AddPendingExpenseModal from "./modals/AddPendingExpenseModal"
import RemovePendingExpenseModal from "./modals/RemovePendingExpenseModal"
import UpdatePendingExpenseModal from "./modals/UpdatePendingExpenseModal"
import CompletePendingExpenseModal from "./modals/CompletePendingExpenseModal"


const PendingExpenses = () => {

    const { setPendingExpenseToRemoveId, setPendingExpenseToUpdate, setPendingExpenseToComplete } = usePendingExpenses();

    const toggleAddPendingExpenseModal = () => {
        const addPendingExpenseModal = document.getElementById('add-pending-expense-modal-container');

        addPendingExpenseModal.classList.contains('show-modal-container') ? addPendingExpenseModal.classList.remove('show-modal-container') : addPendingExpenseModal.classList.add('show-modal-container');
    };

    const toggleRemovePendingExpenseModal = (pendingExpenseToRemoveId) => {
        const removePendingExpenseModal = document.getElementById('remove-pending-expense-modal-container');

        removePendingExpenseModal.classList.contains('show-modal-container') ? removePendingExpenseModal.classList.remove('show-modal-container') : removePendingExpenseModal.classList.add('show-modal-container');

        setPendingExpenseToRemoveId(pendingExpenseToRemoveId);
    };

    const toggleUpdatePendingExpenseModal = (pendingExpenseToUpdate) => {
        const updatePendingExpenseModal = document.getElementById('update-pending-expense-modal-container');

        updatePendingExpenseModal.classList.contains('show-modal-container') ? updatePendingExpenseModal.classList.remove('show-modal-container') : updatePendingExpenseModal.classList.add('show-modal-container');

        setPendingExpenseToUpdate(pendingExpenseToUpdate);
    };

    const toggleCompletePendingExpenseModal = (pendingExpenseToComplete) => {
        const completePendingExpenseModal = document.getElementById('complete-pending-expense-modal-container');

        completePendingExpenseModal.classList.contains('show-modal-container') ? completePendingExpenseModal.classList.remove('show-modal-container') : completePendingExpenseModal.classList.add('show-modal-container');

        setPendingExpenseToComplete(pendingExpenseToComplete);
    };

    return (
        <div className="w-full h-full flex flex-col">
            <div className="flex w-full h-10 items-center justify-between">
                <h1 className="text-lg lg:text-2xl page-heading">Pending Expenses</h1>
            </div>
            <div className="mt-2 lg:mt-8 flex items-center justify-between gap-2">
                <SearchPendingExpenses />
                <button
                    onClick={() => toggleAddPendingExpenseModal()}
                    className="flex h-10 items-center rounded-lg bg-blue-600 px-4 text-sm font-medium text-white transition-colors hover:bg-blue-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600"
                >
                    <span className="hidden md:block">Add Upcoming Expense</span>{' '}
                    <PlusIcon className="h-5 md:ml-4" />
                </button>
            </div>
            <PendingExpensesTable
                toggleRemovePendingExpenseModal={toggleRemovePendingExpenseModal}
                toggleUpdatePendingExpenseModal={toggleUpdatePendingExpenseModal}
                toggleCompletePendingExpenseModal={toggleCompletePendingExpenseModal}
            />

            <AddPendingExpenseModal toggleAddPendingExpenseModal={toggleAddPendingExpenseModal} />
            <RemovePendingExpenseModal toggleRemovePendingExpenseModal={toggleRemovePendingExpenseModal} />
            <UpdatePendingExpenseModal toggleUpdatePendingExpenseModal={toggleUpdatePendingExpenseModal} />
            <CompletePendingExpenseModal toggleCompletePendingExpenseModal={toggleCompletePendingExpenseModal} />
        </div>
    )
}

export default PendingExpenses