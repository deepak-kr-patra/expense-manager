import useRemovePendingExpense from "../../../hooks/pending_expenses/useRemovePendingExpense";
import usePendingExpenses from "../../../zustand/usePendingExpenses";


const RemovePendingExpenseModal = ({ toggleRemovePendingExpenseModal }) => {

    const { loading, removePendingExpense } = useRemovePendingExpense();
    const { pendingExpenseToRemoveId } = usePendingExpenses();

    const deletePendingExpense = async () => {
        await removePendingExpense(pendingExpenseToRemoveId);
        toggleRemovePendingExpenseModal(null);
    };

    return (
        <div className='modal-container' id='remove-pending-expense-modal-container'>
            <div className="modal-box max-sm:p-4 bg-[#F4F5F7]">
                <h3 className="font-bold text-lg max-sm:text-[16px]">Delete pending expense?</h3>
                <div className='flex justify-end mt-6 gap-2'>
                    <button
                        className="btn max-sm:min-h-10 max-sm:h-10 max-sm:px-2 bg-gray-300"
                        onClick={() => toggleRemovePendingExpenseModal(null)}
                    >
                        Cancel
                    </button>
                    <button
                        className="btn max-sm:min-h-10 max-sm:h-10 max-sm:px-2 bg-[#cb2727] hover:bg-[#a82e2e] text-white"
                        onClick={() => deletePendingExpense()}
                        disabled={loading}
                    >
                        {loading ? <span className='loading loading-spinner'></span> : "Delete"}
                    </button>
                </div>
            </div>
        </div>
    )
}

export default RemovePendingExpenseModal