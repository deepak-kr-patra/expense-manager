import useRemoveExpense from "../../../hooks/expenses/useRemoveExpense";
import useExpenses from "../../../zustand/useExpenses";


const RemoveExpenseModal = ({ toggleRemoveExpenseModal }) => {

    const { loading, removeExpense } = useRemoveExpense();
    const { expenseToRemoveId } = useExpenses();

    const deleteExpense = async () => {
        await removeExpense(expenseToRemoveId);
        toggleRemoveExpenseModal(null);
    };

    return (
        <div className='modal-container' id='remove-expense-modal-container'>
            <div className="modal-box max-sm:p-4 bg-[#F4F5F7]">
                <h3 className="font-bold text-lg max-sm:text-[16px]">DELETE THE EXPENSE?</h3>
                <div className='flex justify-end mt-6 gap-2'>
                    <button
                        className="btn max-sm:min-h-10 max-sm:h-10 max-sm:px-2 bg-gray-300"
                        onClick={() => toggleRemoveExpenseModal(null)}
                    >
                        Cancel
                    </button>
                    <button
                        className="btn max-sm:min-h-10 max-sm:h-10 max-sm:px-2 bg-[#cb2727] hover:bg-[#a82e2e] text-white"
                        onClick={() => deleteExpense()}
                        disabled={loading}
                    >
                        {loading ? <span className='loading loading-spinner'></span> : "Delete"}
                    </button>
                </div>
            </div>
        </div>
    )
}

export default RemoveExpenseModal