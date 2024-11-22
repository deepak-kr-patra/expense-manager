import { useState } from 'react';
import useAddExpense from '../../../hooks/expenses/useAddExpense';


const AddExpenseModal = ({ toggleAddExpenseModal }) => {

    const [userInputs, setUserInputs] = useState({
        title: "",
        amount: "",
        category: null,
        date: new Date()
    });

    const { loading, addExpense } = useAddExpense();

    function clearSelected() {
        var categories = document.getElementById("add-expense-category-box").options;
        categories[0].selected = true;
        for (var i = 1; i < categories.length; i++) {
            if (categories[i].selected)
                categories[i].selected = false;
        }
    };

    const saveExpense = async (e) => {
        e.preventDefault();
        const expenseAdded = await addExpense(userInputs);
        if (!expenseAdded) {
            return;
        }
        setUserInputs({
            title: "",
            amount: "",
            category: null,
            date: new Date()
        });
        clearSelected();
        toggleAddExpenseModal();
    };

    return (
        <div className='modal-container' id='add-expense-modal-container'>
            <div className="modal-box max-h-full max-sm:p-4 bg-[#F4F5F7]">
                <h3 className="font-bold text-lg max-sm:text-[16px] mb-6">ADD AN EXPENSE</h3>
                <form onSubmit={saveExpense} className='flex flex-col'>
                    <div className='mb-4'>
                        <label className="label pt-0 pb-1 cursor-pointer" htmlFor='add-title-input'>
                            <span className="label-text">Expense Title</span>
                        </label>
                        <input
                            id='add-title-input'
                            type="text"
                            className="input input-bordered focus:outline-none focus:border-2 focus:border-blue-700 bg-[#EAECEF] focus:bg-white w-full h-12"
                            placeholder='Enter title'
                            value={userInputs.title}
                            onChange={(e) => setUserInputs({ ...userInputs, title: e.target.value })}
                        />
                    </div>

                    <div className='mb-4'>
                        <label className="label pt-0 pb-1 cursor-pointer" htmlFor='add-amount-input'>
                            <span className="label-text">Expense Amount</span>
                        </label>
                        <input
                            id='add-amount-input'
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
                            <label className="label pt-0 pb-1 cursor-pointer" htmlFor='add-expense-category-box'>
                                <span className="label-text">Expense Category</span>
                            </label>
                            <select
                                id='add-expense-category-box'
                                className="select select-bordered focus:outline-none focus:border-2 focus:border-blue-700 bg-[#EAECEF] focus:bg-white w-full"
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
                            <label className="label pt-0 pb-1 cursor-pointer" htmlFor='add-date-input'>
                                <span className="label-text">Expense Date</span>
                            </label>
                            <input
                                id='add-date-input'
                                type="date"
                                className="input input-bordered focus:outline-none focus:border-2 focus:border-blue-700 bg-[#EAECEF] focus:bg-white w-full"
                                value={userInputs.date}
                                onChange={(e) => setUserInputs({ ...userInputs, date: e.target.value })}
                            />
                        </div>
                    </div>

                    <div className='flex justify-end mt-6 gap-2'>
                        <button
                            type='button'
                            className="btn max-sm:min-h-10 max-sm:h-10 max-sm:px-2 bg-gray-300"
                            onClick={() => toggleAddExpenseModal()}
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

export default AddExpenseModal