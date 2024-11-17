import { PlusIcon } from "@heroicons/react/24/outline"
import SearchExpenses from "./SearchExpenses"
import ExpensesTable from "./ExpensesTable"
import useExpenses from "../../zustand/useExpenses"
import AddExpenseModal from "./modals/AddExpenseModal"
import RemoveExpenseModal from "./modals/RemoveExpenseModal"
import UpdateExpenseModal from "./modals/updateExpenseModal"


const Expenses = () => {

    const { setExpenseToRemoveId, setExpenseToUpdate } = useExpenses();

    const toggleAddExpenseModal = () => {
        const addExpenseModal = document.getElementById('add-expense-modal-container');

        addExpenseModal.classList.contains('show-modal-container') ? addExpenseModal.classList.remove('show-modal-container') : addExpenseModal.classList.add('show-modal-container');
    };

    const toggleRemoveExpenseModal = (expenseToRemoveId) => {
        const removeExpenseModal = document.getElementById('remove-expense-modal-container');

        removeExpenseModal.classList.contains('show-modal-container') ? removeExpenseModal.classList.remove('show-modal-container') : removeExpenseModal.classList.add('show-modal-container');

        setExpenseToRemoveId(expenseToRemoveId);
    };

    const toggleUpdateExpenseModal = (expenseToUpdate) => {
        const updateExpenseModal = document.getElementById('update-expense-modal-container');

        updateExpenseModal.classList.contains('show-modal-container') ? updateExpenseModal.classList.remove('show-modal-container') : updateExpenseModal.classList.add('show-modal-container');

        setExpenseToUpdate(expenseToUpdate);
    };

    return (
        <div className="w-full h-full flex flex-col">
            <div className="flex w-full h-10 items-center justify-between">
                <h1 className="text-lg lg:text-2xl page-heading">Expenses</h1>
            </div>
            <div className="mt-2 lg:mt-8 flex items-center justify-between gap-2">
                <SearchExpenses />
                <button
                    onClick={() => toggleAddExpenseModal()}
                    className="flex h-10 items-center rounded-lg bg-blue-600 px-4 text-sm font-medium text-white transition-colors hover:bg-blue-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600"
                >
                    <span className="hidden md:block">Add Expense</span>{' '}
                    <PlusIcon className="h-5 md:ml-4" />
                </button>
            </div>
            <ExpensesTable
                toggleRemoveExpenseModal={toggleRemoveExpenseModal}
                toggleUpdateExpenseModal={toggleUpdateExpenseModal}
            />

            <AddExpenseModal toggleAddExpenseModal={toggleAddExpenseModal} />
            <RemoveExpenseModal toggleRemoveExpenseModal={toggleRemoveExpenseModal} />
            <UpdateExpenseModal toggleUpdateExpenseModal={toggleUpdateExpenseModal} />
        </div>
    )
}

export default Expenses