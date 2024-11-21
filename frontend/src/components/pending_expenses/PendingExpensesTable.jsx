import { CheckIcon, PencilIcon, TrashIcon } from "@heroicons/react/24/outline";
import useGetPendingExpenses from "../../hooks/pending_expenses/useGetPendingExpenses";
import formatDateToLocal from "../../utils/formatDateToLocal";
import formatCurrency from "../../utils/formatCurrency";
import { PendingExpensesTableSkeleton } from "../Skeletons";


const PendingExpensesTable = ({
    toggleRemovePendingExpenseModal,
    toggleUpdatePendingExpenseModal,
    toggleCompletePendingExpenseModal
}) => {

    const { loading, pendingExpenses, selectedPendingExpenses } = useGetPendingExpenses();

    const icons = {
        food: "/cutlery.png",
        clothing: "/wardrobe.png",
        home: "/house.png",
        travel: "/suitcase.png",
        study: "/studying.png",
        others: "/unknown.png"
    };

    return (
        <>
            {loading && <PendingExpensesTableSkeleton />}

            {!loading && pendingExpenses.length === 0 && (
                <div className="mt-4 lg:mt-6 w-full grow flex flex-col items-center justify-center rounded-lg bg-gray-100 p-2 gap-1">
                    <h3 className="text-sm">You have no pending expense.</h3>
                    <h3 className="text-sm">Add an upcoming expense!</h3>
                </div>
            )}

            {!loading && pendingExpenses.length > 0 &&
                <div className="mt-4 lg:mt-6 w-full overflow-y-auto rounded-lg bg-gray-100 border-8 lg:border-r-0xxx lg:border-t-0 border-gray-100">
                    <div className="lg:hidden flex flex-col gap-2">
                        {selectedPendingExpenses?.map((expense) => (
                            <div
                                key={expense._id}
                                className="mb-2xxx w-full rounded-md bg-white p-4"
                            >
                                <div className="flex items-center justify-between border-b pb-4">
                                    <div className="mb-2 flex items-center gap-2">
                                        <img
                                            src={icons[expense.category]}
                                            alt="image"
                                            width={28}
                                            height={28}
                                        />
                                        <p>{expense.title}</p>
                                    </div>
                                </div>
                                <div className="flex w-full items-center justify-between pt-4">
                                    <div>
                                        <p className="text-lg font-medium">
                                            {formatCurrency(expense.amount)}
                                        </p>
                                        <p className="text-sm">
                                            {formatDateToLocal(expense.date)}
                                        </p>
                                    </div>
                                    <div className="flex justify-end gap-2">
                                        <button
                                            className="rounded-md border p-2 hover:bg-gray-100"
                                            onClick={() => toggleUpdatePendingExpenseModal(expense)}
                                        >
                                            <PencilIcon className="w-5" />
                                        </button>
                                        <button
                                            className="rounded-md border p-2 hover:bg-gray-100"
                                            onClick={() => toggleCompletePendingExpenseModal(expense)}
                                        >
                                            <CheckIcon className="w-5" />
                                        </button>
                                        <button
                                            className="rounded-md border p-2 hover:bg-gray-100"
                                            onClick={() => toggleRemovePendingExpenseModal(expense._id)}
                                        >
                                            <TrashIcon className="w-5" />
                                        </button>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                    <table className="hidden w-full text-gray-900 lg:table">
                        <thead className="rounded-lg text-left text-sm font-normal sticky top-0 bg-gray-100">
                            <tr className="text-black textarea-md">
                                <th scope="col" className="px-3 py-5 font-medium">
                                    Title
                                </th>
                                <th scope="col" className="px-3 py-5 font-medium">
                                    Category
                                </th>
                                <th scope="col" className="px-3 py-5 font-medium">
                                    Amount
                                </th>
                                <th scope="col" className="px-3 py-5 font-medium">
                                    Date
                                </th>
                                <th scope="col" className="relative py-3 pl-6 pr-3">
                                    <span className="sr-only">Edit</span>
                                </th>
                            </tr>
                        </thead>
                        <tbody className="bg-white">
                            {selectedPendingExpenses?.map((expense) => (
                                <tr
                                    key={expense._id}
                                    className="w-full border-b py-3 text-sm last-of-type:border-none [&:first-child>td:first-child]:rounded-tl-lg [&:first-child>td:last-child]:rounded-tr-lg [&:last-child>td:first-child]:rounded-bl-lg [&:last-child>td:last-child]:rounded-br-lg"
                                >
                                    <td className="whitespace-nowrap py-3 pl-6 pr-3">
                                        <div className="flex items-center gap-3">
                                            <p>{expense.title}</p>
                                        </div>
                                    </td>
                                    <td className="whitespace-nowrap px-3 py-3">
                                        <div className="flex items-center gap-2">
                                            <img
                                                src={icons[expense.category]}
                                                alt="image"
                                                width={28}
                                                height={28}
                                            />
                                            <p>{expense.category}</p>
                                        </div>
                                    </td>
                                    <td className="whitespace-nowrap px-3 py-3">
                                        {formatCurrency(expense.amount)}
                                    </td>
                                    <td className="whitespace-nowrap px-3 py-3">
                                        {formatDateToLocal(expense.date)}
                                    </td>
                                    <td className="whitespace-nowrap py-3 pl-6 pr-3">
                                        <div className="flex justify-end gap-3">
                                            <button
                                                className="rounded-md border p-2 hover:bg-gray-100"
                                                onClick={() => toggleUpdatePendingExpenseModal(expense)}
                                            >
                                                <PencilIcon className="w-5" />
                                            </button>
                                            <button
                                                className="rounded-md border p-2 hover:bg-gray-100"
                                                onClick={() => toggleCompletePendingExpenseModal(expense)}
                                            >
                                                <CheckIcon className="w-5" />
                                            </button>
                                            <button
                                                className="rounded-md border p-2 hover:bg-gray-100"
                                                onClick={() => toggleRemovePendingExpenseModal(expense._id)}
                                            >
                                                <TrashIcon className="w-5" />
                                            </button>
                                        </div>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            }
        </>
    )
}

export default PendingExpensesTable