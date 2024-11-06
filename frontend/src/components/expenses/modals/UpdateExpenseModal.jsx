import { useState } from "react";
import useUpdateExpense from "../../../hooks/expenses/useUpdateExpense";
import useExpenses from "../../../zustand/useExpenses";


const UpdateExpenseModal = ({ toggleUpdateExpenseModal }) => {

    const { expenseToUpdate, setExpenseToUpdate } = useExpenses();
    console.log("walah", expenseToUpdate);

    // const [userInputs, setUserInputs] = useState({
    //     title: expenseToUpdate?.title,
    //     amount: expenseToUpdate?.amount,
    //     category: expenseToUpdate?.category,
    //     date: expenseToUpdate?.date
    // });
    const expenseToUpdateValues = {
        title: expenseToUpdate?.title,
        amount: expenseToUpdate?.amount,
        category: expenseToUpdate?.category,
        date: expenseToUpdate?.date
    };

    const { loading, updateExpense } = useUpdateExpense();

    function clearSelected() {
        var categories = document.getElementById("update-expense-category-box").options;
        categories[0].selected = true;
        for (var i = 1; i < categories.length; i++) {
            if (categories[i].selected)
                categories[i].selected = false;
        }
    };

    const editExpense = async (e) => {
        e.preventDefault();
        const expenseUpdated = await updateExpense(expenseToUpdateValues, expenseToUpdate._id);
        if (!expenseUpdated) {
            return;
        }
        setExpenseToUpdate({
            title: "",
            amount: "",
            category: null,
            date: new Date()
        });
        clearSelected();
        toggleUpdateExpenseModal(null);
    };

    return (
        <div className='modal-container' id='update-expense-modal-container'>
            <div className="modal-box max-sm:p-4 bg-[#F4F5F7]">
                <h3 className="font-bold text-lg max-sm:text-[16px] mb-8">Update expense</h3>
                <form onSubmit={editExpense} className='flex flex-col'>
                    <div className='relative mb-8 max-sm:mb-6'>
                        <input
                            type="text"
                            // id='title-input'
                            className="input input-bordered focus:outline-none focus:border-2 focus:border-blue-700 bg-[#EAECEF] focus:bg-white w-full h-12"
                            placeholder='Enter title'
                            value={expenseToUpdate?.title}
                            onChange={(e) => setExpenseToUpdate({ ...expenseToUpdate, title: e.target.value })}
                        />
                    </div>

                    <div className='mb-8 max-sm:mb-6'>
                        {/* <label htmlFor="count" className='text-white pl-2 section-info-text'>Enter amount</label> */}
                        <input
                            type="number"
                            placeholder="Enter amount"
                            className="input input-bordered focus:outline-none focus:border-2 focus:border-blue-700 bg-[#EAECEF] focus:bg-white w-full"
                            // id='count'
                            value={expenseToUpdate?.amount}
                            onChange={(e) => setExpenseToUpdate({ ...expenseToUpdate, amount: e.target.value })}
                            step={.01}
                        />
                    </div>

                    <div className='w-full flex flex-col md:flex-row items-center justify-center md:justify-between gap-6 md:gap-2 mb-8 max-sm:mb-6'>
                        <select
                            id='update-expense-category-box'
                            className="select select-bordered focus:outline-none focus:border-2 focus:border-blue-700 bg-[#EAECEF] focus:bg-white w-full md:w-1/2 h-full"
                            value={expenseToUpdate?.category}
                            onChange={(e) => setExpenseToUpdate({ ...expenseToUpdate, category: e.target.value })}
                        >
                            <option disabled selected>Select category?</option>
                            <option>food</option>
                            <option>clothing</option>
                            <option>home</option>
                            <option>travel</option>
                            <option>study</option>
                            <option>others</option>
                        </select>
                        {/* <label className="flex items-center w-full md:w-1/2"> */}
                        <input
                            type="date"
                            className="growww w-full md:w-1/2 input input-bordered focus:outline-none focus:border-2 focus:border-blue-700 bg-[#EAECEF] focus:bg-white"
                            // id='date'
                            value={expenseToUpdate?.date}
                            onChange={(e) => setExpenseToUpdate({ ...expenseToUpdate, date: e.target.value })}
                        />
                        {/* </label> */}
                    </div>

                    <div className='flex justify-end mt-6 gap-2'>
                        <button
                            type='button'
                            className="btn max-sm:min-h-10 max-sm:h-10 max-sm:px-2 bg-gray-300"
                            onClick={() => toggleUpdateExpenseModal(null)}
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

export default UpdateExpenseModal