import { useState } from 'react';
import { ChevronDownIcon, ChevronUpIcon } from '@heroicons/react/24/outline';
import useChartsDetails from '../../../zustand/useChartsDetails';


const PieChartDropdown = () => {

    const { pieChartPeriod, setPieChartPeriod } = useChartsDetails();
    const [toggleState, setToggleState] = useState(false);

    const setPeriodStr = (periodStr) => {
        setPieChartPeriod(periodStr);
    };

    const toggleDropdown = () => {
        const dropdown = document.getElementById('pie-chart-dropdown');

        dropdown.classList.contains('dropdown-open') ? dropdown.classList.remove('dropdown-open') : dropdown.classList.add('dropdown-open');

        toggleState === false ? setToggleState(true) : setToggleState(false);
    };

    return (
        <div
            className="dropdown dropdown-bottom dropdown-end rounded-lg h-6 lg:h-9 flex items-center px-2 lg:px-4 bg-[#EAECEF] w-[108px] lg:w-32 border-2 hover:border-black cursor-pointer"
            id='pie-chart-dropdown'
        >
            <div
                className='w-full flex items-center justify-between gap-2'
                onClick={() => toggleDropdown()}
            >
                <h3 className='text-xs lg:text-md'>{pieChartPeriod}</h3>
                {!toggleState ? <ChevronDownIcon className='w-4' /> : <ChevronUpIcon className='w-4' />}
            </div>

            <ul
                // tabIndex={0}
                className="dropdown-content menu bg-base-100 rounded-box z-[1] w-52 p-2 shadow"
                onClick={() => toggleDropdown()}
            >
                <div
                    className='p-2 max-md:p-1.5 max-sm:p-1 rounded-lg hover:bg-slate-200 cursor-pointer'
                    onClick={() => setPeriodStr('All Time')}
                >
                    All Time
                </div>
                <div
                    className='p-2 max-md:p-1.5 max-sm:p-1 rounded-lg hover:bg-slate-200 cursor-pointer'
                    onClick={() => setPeriodStr('This Year')}
                >
                    This Year
                </div>
                <div
                    className='p-2 max-md:p-1.5 max-sm:p-1 rounded-lg hover:bg-slate-200 cursor-pointer'
                    onClick={() => setPeriodStr('This Month')}
                >
                    This Month
                </div>
            </ul>
        </div>
    )
}

export default PieChartDropdown


// return (
//     <select
//         id='add-expense-category-boxvksjvb'
//         className="select h-9 min-h-9 select-bordered focus:outline-none focus:border-2 focus:border-blue-700 bg-[#EAECEF] focus:bg-white w-full md:w-1/2"
//     >
//         <option disabled selected>Select category?</option>
//         <option>All Time</option>
//         <option>This Year</option>
//         <option>Last 90 Days</option>
//     </select>
// )