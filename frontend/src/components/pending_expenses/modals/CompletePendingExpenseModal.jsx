import usePendingExpenses from "../../../zustand/usePendingExpenses";
import useCompletePendingExpense from "../../../hooks/pending_expenses/useCompletePendingExpense";
import formatDate from "../../../utils/formatDate";


const CompletePendingExpenseModal = ({ toggleCompletePendingExpenseModal }) => {

    const { pendingExpenseToComplete, setPendingExpenseToComplete } = usePendingExpenses();

    const pendingExpenseToCompleteValues = {
        title: pendingExpenseToComplete?.title,
        amount: pendingExpenseToComplete?.amount,
        category: pendingExpenseToComplete?.category,
        date: pendingExpenseToComplete?.date
    };

    const { loading, completePendingExpense } = useCompletePendingExpense();

    function clearSelected() {
        var categories = document.getElementById("complete-pending-expense-category-box").options;
        categories[0].selected = true;
        for (var i = 1; i < categories.length; i++) {
            if (categories[i].selected)
                categories[i].selected = false;
        }
    };

    const finishPendingExpense = async (e) => {
        e.preventDefault();
        const pendingExpenseCompleted = await completePendingExpense(pendingExpenseToCompleteValues, pendingExpenseToComplete._id);
        if (!pendingExpenseCompleted) {
            return;
        }
        setPendingExpenseToComplete({
            title: "",
            amount: "",
            category: null,
            date: new Date()
        });
        clearSelected();
        toggleCompletePendingExpenseModal(null);
    };

    return (
        <div className='modal-container' id='complete-pending-expense-modal-container'>
            <div className="modal-box max-h-full max-sm:p-4 bg-[#F4F5F7]">
                <h3 className="font-bold text-lg max-sm:text-[16px] mb-6">COMPLETE PENDING EXPENSE?</h3>
                <form onSubmit={finishPendingExpense} className='flex flex-col'>
                    <div className='mb-4'>
                        <label className="label pt-0 pb-1 cursor-pointer" htmlFor='complete-pending-title-input'>
                            <span className="label-text">Pending Expense Title</span>
                        </label>
                        <input
                            id='complete-pending-title-input'
                            type="text"
                            className="input input-bordered focus:outline-none focus:border-2 focus:border-blue-700 bg-[#EAECEF] focus:bg-white w-full h-12"
                            placeholder='Enter title'
                            value={pendingExpenseToComplete?.title}
                            onChange={(e) => setPendingExpenseToComplete({ ...pendingExpenseToComplete, title: e.target.value })}
                        />
                    </div>

                    <div className='mb-4'>
                        <label className="label pt-0 pb-1 cursor-pointer" htmlFor='complete-pending-amount-input'>
                            <span className="label-text">Pending Expense Amount</span>
                        </label>
                        <input
                            id='complete-pending-amount-input'
                            type="number"
                            placeholder="Enter amount"
                            className="input input-bordered focus:outline-none focus:border-2 focus:border-blue-700 bg-[#EAECEF] focus:bg-white w-full"
                            value={pendingExpenseToComplete?.amount}
                            onChange={(e) => setPendingExpenseToComplete({ ...pendingExpenseToComplete, amount: e.target.value })}
                            step={.01}
                        />
                    </div>

                    <div className='w-full flex flex-col md:flex-row items-center justify-center md:justify-between gap-4 md:gap-2 mb-4'>
                        <div className='w-full md:w-1/2'>
                            <label className="label pt-0 pb-1 cursor-pointer" htmlFor='complete-pending-expense-category-box'>
                                <span className="label-text">Pending Expense Category</span>
                            </label>
                            <select
                                id='complete-pending-expense-category-box'
                                className="w-full select select-bordered focus:outline-none focus:border-2 focus:border-blue-700 bg-[#EAECEF] focus:bg-white"
                                value={pendingExpenseToComplete?.category}
                                onChange={(e) => setPendingExpenseToComplete({ ...pendingExpenseToComplete, category: e.target.value })}
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
                            <label className="label pt-0 pb-1 cursor-pointer" htmlFor='complete-pending-date-input'>
                                <span className="label-text">Pending Expense Date</span>
                            </label>
                            <input
                                id="complete-pending-date-input"
                                type="date"
                                className="w-full input input-bordered focus:outline-none focus:border-2 focus:border-blue-700 bg-[#EAECEF] focus:bg-white"
                                value={formatDate(pendingExpenseToComplete?.date)}
                                onChange={(e) => setPendingExpenseToComplete({ ...pendingExpenseToComplete, date: e.target.value })}
                            />
                        </div>
                    </div>

                    <div className='flex justify-end mt-6 gap-2'>
                        <button
                            type='button'
                            className="btn max-sm:min-h-10 max-sm:h-10 max-sm:px-2 bg-gray-300"
                            onClick={() => toggleCompletePendingExpenseModal(null)}
                        >
                            Cancel
                        </button>
                        <button
                            type='submit'
                            className="btn max-sm:min-h-10 max-sm:h-10 max-sm:px-2 bg-[#276aa1] hover:bg-[#1d4b71] text-white"
                            disabled={loading}
                        >
                            {loading ? <span className='loading loading-spinner'></span> : "Complete"}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    )
}

export default CompletePendingExpenseModal