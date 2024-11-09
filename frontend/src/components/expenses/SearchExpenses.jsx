import { MagnifyingGlassIcon } from '@heroicons/react/24/outline';
import { useDebouncedCallback } from 'use-debounce';
import useExpenses from '../../zustand/useExpenses';
import formatDateToLocal from '../../utils/formatDateToLocal';


export default function SearchExpenses() {

    const { expenses, setSelectedExpenses } = useExpenses();

    const handleSearch = useDebouncedCallback((term) => {
        const filteredExpenses = expenses.filter((expense) => (
            expense.title.toLowerCase().includes(term.toLowerCase()) || 
            expense.amount.toString().includes(term) || 
            expense.category.toLowerCase().includes(term.toLowerCase()) || 
            formatDateToLocal(expense.date).toLowerCase().includes(term.toLowerCase())
        ));

        setSelectedExpenses(filteredExpenses);
    }, 300);

    return (
        <div className="relative flex flex-1 flex-shrink-0">
            <label htmlFor="search" className="sr-only">
                Search
            </label>
            <input
                className="block w-full rounded-md border border-gray-200 py-[9px] pl-10 text-sm outline-2 placeholder:text-gray-500"
                placeholder="Search expenses..."
                onChange={(e) => {
                    handleSearch(e.target.value);
                }}
                // defaultValue={""}
            />
            <MagnifyingGlassIcon className="absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-gray-500 peer-focus:text-gray-900" />
        </div>
    );
}
