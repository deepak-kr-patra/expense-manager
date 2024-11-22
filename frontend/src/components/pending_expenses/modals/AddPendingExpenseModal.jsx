import { useState } from 'react';
import useAddPendingExpense from '../../../hooks/pending_expenses/useAddPendingExpense';


const AddPendingExpenseModal = ({ toggleAddPendingExpenseModal }) => {

    const [userInputs, setUserInputs] = useState({
        title: "",
        amount: "",
        category: null,
        date: new Date()
    });

    const { loading, addPendingExpense } = useAddPendingExpense();

    function clearSelected() {
        var categories = document.getElementById("add-pending-expense-category-box").options;
        categories[0].selected = true;
        for (var i = 1; i < categories.length; i++) {
            if (categories[i].selected)
                categories[i].selected = false;
        }
    };

    const savePendingExpense = async (e) => {
        e.preventDefault();
        const pendingExpenseAdded = await addPendingExpense(userInputs);
        if (!pendingExpenseAdded) {
            return;
        }
        setUserInputs({
            title: "",
            amount: "",
            category: null,
            date: new Date()
        });
        clearSelected();
        toggleAddPendingExpenseModal();
    };

    return (
        <div className='modal-container' id='add-pending-expense-modal-container'>
            <div className="modal-box max-h-full max-sm:p-4 bg-[#F4F5F7]">
                <h3 className="font-bold text-lg max-sm:text-[16px] mb-6">ADD UPCOMING EXPENSE</h3>
                <form onSubmit={savePendingExpense} className='flex flex-col'>
                    <div className='mb-4'>
                        <label className="label pt-0 pb-1 cursor-pointer" htmlFor='add-pending-title-input'>
                            <span className="label-text">Upcomig Expense Title</span>
                        </label>
                        <input
                            id='add-pending-title-input'
                            type="text"
                            className="input input-bordered focus:outline-none focus:border-2 focus:border-blue-700 bg-[#EAECEF] focus:bg-white w-full h-12"
                            placeholder='Enter title'
                            value={userInputs.title}
                            onChange={(e) => setUserInputs({ ...userInputs, title: e.target.value })}
                        />
                    </div>

                    <div className='mb-4'>
                        <label className="label pt-0 pb-1 cursor-pointer" htmlFor='add-pending-amount-input'>
                            <span className="label-text">Upcoming Expense Amount</span>
                        </label>
                        <input
                            id='add-pending-amount-input'
                            type="number"
                            placeholder="Enter amount"
                            className="input input-bordered focus:outline-none focus:border-2 focus:border-blue-700 bg-[#EAECEF] focus:bg-white w-full"
                            value={userInputs.amount}
                            onChange={(e) => setUserInputs({ ...userInputs, amount: e.target.value })}
                            step={.01}
                        />
                    </div>

                    <div className='w-full flex flex-col md:flex-row items-center justify-center md:justify-between gap-4 md:gap-2 mb-4'>
                        <div className='w-full md:w-1/2'>
                            <label className="label pt-0 pb-1 cursor-pointer" htmlFor='add-pending-expense-category-box'>
                                <span className="label-text">Upcoming Expense Category</span>
                            </label>
                            <select
                                id='add-pending-expense-category-box'
                                className="w-full select select-bordered focus:outline-none focus:border-2 focus:border-blue-700 bg-[#EAECEF] focus:bg-white"
                                value={userInputs.category}
                                onChange={(e) => setUserInputs({ ...userInputs, category: e.target.value })}
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
                            <label className="label pt-0 pb-1 cursor-pointer" htmlFor='add-pending-date-input'>
                                <span className="label-text">Upcoming Expense Date</span>
                            </label>
                            <input
                                id='add-pending-date-input'
                                type="date"
                                className="w-full input input-bordered focus:outline-none focus:border-2 focus:border-blue-700 bg-[#EAECEF] focus:bg-white"
                                value={userInputs.date}
                                onChange={(e) => setUserInputs({ ...userInputs, date: e.target.value })}
                            />
                        </div>
                    </div>

                    <div className='flex justify-end mt-6 gap-2'>
                        <button
                            type='button'
                            className="btn max-sm:min-h-10 max-sm:h-10 max-sm:px-2 bg-gray-300"
                            onClick={() => toggleAddPendingExpenseModal()}
                        >
                            Cancel
                        </button>
                        <button
                            type='submit'
                            className="btn max-sm:min-h-10 max-sm:h-10 max-sm:px-2 bg-[#276aa1] hover:bg-[#1d4b71] text-white"
                            disabled={loading}
                        >
                            {loading ? <span className='loading loading-spinner'></span> : "Save"}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    )
}

export default AddPendingExpenseModal