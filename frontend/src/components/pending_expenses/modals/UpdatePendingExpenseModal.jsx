import usePendingExpenses from "../../../zustand/usePendingExpenses";
import useUpdatePendingExpense from "../../../hooks/pending_expenses/useUpdatePendingExpense";


const UpdatePendingExpenseModal = ({ toggleUpdatePendingExpenseModal }) => {

    const { pendingExpenseToUpdate, setPendingExpenseToUpdate } = usePendingExpenses();

    const pendingExpenseToUpdateValues = {
        title: pendingExpenseToUpdate?.title,
        amount: pendingExpenseToUpdate?.amount,
        category: pendingExpenseToUpdate?.category,
        date: pendingExpenseToUpdate?.date
    };

    const { loading, updatePendingExpense } = useUpdatePendingExpense();

    function clearSelected() {
        var categories = document.getElementById("update-pending-expense-category-box").options;
        categories[0].selected = true;
        for (var i = 1; i < categories.length; i++) {
            if (categories[i].selected)
                categories[i].selected = false;
        }
    };

    const editPendingExpense = async (e) => {
        e.preventDefault();
        const pendingExpenseUpdated = await updatePendingExpense(pendingExpenseToUpdateValues, pendingExpenseToUpdate._id);
        if (!pendingExpenseUpdated) {
            return;
        }
        setPendingExpenseToUpdate({
            title: "",
            amount: "",
            category: null,
            date: new Date()
        });
        clearSelected();
        toggleUpdatePendingExpenseModal(null);
    };

    return (
        <div className='modal-container' id='update-pending-expense-modal-container'>
            <div className="modal-box max-h-full max-sm:p-4 bg-[#F4F5F7]">
                <h3 className="font-bold text-lg max-sm:text-[16px] mb-6">UPDATE PENDING EXPENSE</h3>
                <form onSubmit={editPendingExpense} className='flex flex-col'>
                    <div className='mb-4'>
                        <label className="label pt-0 pb-1 cursor-pointer" htmlFor='update-pending-title-input'>
                            <span className="label-text">Pending Expense Title</span>
                        </label>
                        <input
                            id='update-pending-title-input'
                            type="text"
                            className="input input-bordered focus:outline-none focus:border-2 focus:border-blue-700 bg-[#EAECEF] focus:bg-white w-full h-12"
                            placeholder='Enter title'
                            value={pendingExpenseToUpdate?.title}
                            onChange={(e) => setPendingExpenseToUpdate({ ...pendingExpenseToUpdate, title: e.target.value })}
                        />
                    </div>

                    <div className='mb-4'>
                        <label className="label pt-0 pb-1 cursor-pointer" htmlFor='update-pending-amount-input'>
                            <span className="label-text">Pending Expense Amount</span>
                        </label>
                        <input
                            id='update-pending-amount-input'
                            type="number"
                            placeholder="Enter amount"
                            className="input input-bordered focus:outline-none focus:border-2 focus:border-blue-700 bg-[#EAECEF] focus:bg-white w-full"
                            value={pendingExpenseToUpdate?.amount}
                            onChange={(e) => setPendingExpenseToUpdate({ ...pendingExpenseToUpdate, amount: e.target.value })}
                            step={.01}
                        />
                    </div>

                    <div className='w-full flex flex-col md:flex-row items-center justify-center md:justify-between gap-4 md:gap-2 mb-4'>
                        <div className='w-full md:w-1/2'>
                            <label className="label pt-0 pb-1 cursor-pointer" htmlFor='update-pending-expense-category-box'>
                                <span className="label-text">Pending Expense Category</span>
                            </label>
                            <select
                                id='update-pending-expense-category-box'
                                className="w-full select select-bordered focus:outline-none focus:border-2 focus:border-blue-700 bg-[#EAECEF] focus:bg-white"
                                value={pendingExpenseToUpdate?.category}
                                onChange={(e) => setPendingExpenseToUpdate({ ...pendingExpenseToUpdate, category: e.target.value })}
                            >
                                <option disabled selected>Select category?</option>
                                <option>food</option>
                                <option>clothing</option>
                                <option>home</option>
                                <option>travel</option>
                                <option>study</option>
                                <option>others</option>
                            </select>
                        </div>
                        <div className='w-full md:w-1/2'>
                            <label className="label pt-0 pb-1 cursor-pointer" htmlFor='update-pending-date-input'>
                                <span className="label-text">Pending Expense Date</span>
                            </label>
                            <input
                                id="update-pending-date-input"
                                type="date"
                                className="w-full input input-bordered focus:outline-none focus:border-2 focus:border-blue-700 bg-[#EAECEF] focus:bg-white"
                                value={pendingExpenseToUpdate?.date}
                                onChange={(e) => setPendingExpenseToUpdate({ ...pendingExpenseToUpdate, date: e.target.value })}
                            />
                        </div>
                    </div>

                    <div className='flex justify-end mt-6 gap-2'>
                        <button
                            type='button'
                            className="btn max-sm:min-h-10 max-sm:h-10 max-sm:px-2 bg-gray-300"
                            onClick={() => toggleUpdatePendingExpenseModal(null)}
                        >
                            Cancel
                        </button>
                        <button
                            type='submit'
                            className="btn max-sm:min-h-10 max-sm:h-10 max-sm:px-2 bg-[#276aa1] hover:bg-[#1d4b71] text-white"
                            disabled={loading}
                        >
                            {loading ? <span className='loading loading-spinner'></span> : "Update"}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    )
}

export default UpdatePendingExpenseModal