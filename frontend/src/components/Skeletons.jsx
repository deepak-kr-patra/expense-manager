import clsx from "clsx";
import useScreenWidth from "../zustand/useScreenwidth";


export function ExpensesTableRowSkeleton() {
    return (
        <tr className="w-full border-b border-gray-100 last-of-type:border-none [&:first-child>td:first-child]:rounded-tl-lg [&:first-child>td:last-child]:rounded-tr-lg [&:last-child>td:first-child]:rounded-bl-lg [&:last-child>td:last-child]:rounded-br-lg">
            {/* Title */}
            <td className="relative overflow-hidden whitespace-nowrap py-3 pl-6 pr-3">
                <div className="h-6 w-24 rounded bg-gray-100"></div>
            </td>
            {/* Category */}
            <td className="whitespace-nowrap px-3 py-3">
                <div className="flex items-center gap-3">
                    <div className="h-8 w-8 rounded-full bg-gray-100"></div>
                    <div className="h-6 w-32 rounded bg-gray-100"></div>
                </div>
            </td>
            {/* Amount */}
            <td className="whitespace-nowrap px-3 py-3">
                <div className="h-6 w-16 rounded bg-gray-100"></div>
            </td>
            {/* Date */}
            <td className="whitespace-nowrap px-3 py-3">
                <div className="h-6 w-16 rounded bg-gray-100"></div>
            </td>
            {/* Actions */}
            <td className="whitespace-nowrap py-3 pl-6 pr-3">
                <div className="flex justify-end gap-3">
                    <div className="h-[38px] w-[38px] rounded bg-gray-100"></div>
                    <div className="h-[38px] w-[38px] rounded bg-gray-100"></div>
                </div>
            </td>
        </tr>
    );
}

export function ExpensesMobileSkeleton() {
    return (
        <div className="mb-2 w-full rounded-md bg-white p-4">
            <div className="flex items-center justify-between border-b border-gray-100 pb-8">
                <div className="flex items-center">
                    <div className="mr-2 h-8 w-8 rounded-full bg-gray-100"></div>
                    <div className="h-6 w-16 rounded bg-gray-100"></div>
                </div>
            </div>
            <div className="flex w-full items-center justify-between pt-4">
                <div>
                    <div className="h-6 w-16 rounded bg-gray-100"></div>
                    <div className="mt-2 h-6 w-24 rounded bg-gray-100"></div>
                </div>
                <div className="flex justify-end gap-2">
                    <div className="h-10 w-10 rounded bg-gray-100"></div>
                    <div className="h-10 w-10 rounded bg-gray-100"></div>
                </div>
            </div>
        </div>
    );
}

export function ExpensesTableSkeleton() {
    return (
        <div className="mt-6 flow-root">
            <div className="inline-block min-w-full align-middle">
                <div className="rounded-lg bg-gray-100 p-2 lg:pt-0">
                    <div className="lg:hidden">
                        <ExpensesMobileSkeleton />
                        <ExpensesMobileSkeleton />
                        <ExpensesMobileSkeleton />
                        <ExpensesMobileSkeleton />
                        <ExpensesMobileSkeleton />
                        <ExpensesMobileSkeleton />
                    </div>
                    <table className="hidden w-full text-gray-900 lg:table">
                        <thead className="rounded-lg text-left text-sm font-normal">
                            <tr className="text-blackxxx textarea-md">
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
                            </tr>
                        </thead>
                        <tbody className="bg-white">
                            <ExpensesTableRowSkeleton />
                            <ExpensesTableRowSkeleton />
                            <ExpensesTableRowSkeleton />
                            <ExpensesTableRowSkeleton />
                            <ExpensesTableRowSkeleton />
                            <ExpensesTableRowSkeleton />
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
}

export function PendingExpensesTableRowSkeleton() {
    return (
        <tr className="w-full border-b border-gray-100 last-of-type:border-none [&:first-child>td:first-child]:rounded-tl-lg [&:first-child>td:last-child]:rounded-tr-lg [&:last-child>td:first-child]:rounded-bl-lg [&:last-child>td:last-child]:rounded-br-lg">
            {/* Title */}
            <td className="relative overflow-hidden whitespace-nowrap py-3 pl-6 pr-3">
                <div className="h-6 w-24 rounded bg-gray-100"></div>
            </td>
            {/* Category */}
            <td className="whitespace-nowrap px-3 py-3">
                <div className="flex items-center gap-3">
                    <div className="h-8 w-8 rounded-full bg-gray-100"></div>
                    <div className="h-6 w-32 rounded bg-gray-100"></div>
                </div>
            </td>
            {/* Amount */}
            <td className="whitespace-nowrap px-3 py-3">
                <div className="h-6 w-16 rounded bg-gray-100"></div>
            </td>
            {/* Date */}
            <td className="whitespace-nowrap px-3 py-3">
                <div className="h-6 w-16 rounded bg-gray-100"></div>
            </td>
            {/* Actions */}
            <td className="whitespace-nowrap py-3 pl-6 pr-3">
                <div className="flex justify-end gap-3">
                    <div className="h-[38px] w-[38px] rounded bg-gray-100"></div>
                    <div className="h-[38px] w-[38px] rounded bg-gray-100"></div>
                    <div className="h-[38px] w-[38px] rounded bg-gray-100"></div>
                </div>
            </td>
        </tr>
    );
}

export function PendingExpensesMobileSkeleton() {
    return (
        <div className="mb-2 w-full rounded-md bg-white p-4">
            <div className="flex items-center justify-between border-b border-gray-100 pb-8">
                <div className="flex items-center">
                    <div className="mr-2 h-8 w-8 rounded-full bg-gray-100"></div>
                    <div className="h-6 w-16 rounded bg-gray-100"></div>
                </div>
            </div>
            <div className="flex w-full items-center justify-between pt-4">
                <div>
                    <div className="h-6 w-16 rounded bg-gray-100"></div>
                    <div className="mt-2 h-6 w-24 rounded bg-gray-100"></div>
                </div>
                <div className="flex justify-end gap-2">
                    <div className="h-10 w-10 rounded bg-gray-100"></div>
                    <div className="h-10 w-10 rounded bg-gray-100"></div>
                    <div className="h-10 w-10 rounded bg-gray-100"></div>
                </div>
            </div>
        </div>
    );
}

export function PendingExpensesTableSkeleton() {
    return (
        <div className="mt-6 flow-root">
            <div className="inline-block min-w-full align-middle">
                <div className="rounded-lg bg-gray-100 p-2 lg:pt-0">
                    <div className="lg:hidden">
                        <PendingExpensesMobileSkeleton />
                        <PendingExpensesMobileSkeleton />
                        <PendingExpensesMobileSkeleton />
                        <PendingExpensesMobileSkeleton />
                        <PendingExpensesMobileSkeleton />
                        <PendingExpensesMobileSkeleton />
                    </div>
                    <table className="hidden w-full text-gray-900 lg:table">
                        <thead className="rounded-lg text-left text-sm font-normal">
                            <tr className="text-blackxxx textarea-md">
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
                            </tr>
                        </thead>
                        <tbody className="bg-white">
                            <PendingExpensesTableRowSkeleton />
                            <PendingExpensesTableRowSkeleton />
                            <PendingExpensesTableRowSkeleton />
                            <PendingExpensesTableRowSkeleton />
                            <PendingExpensesTableRowSkeleton />
                            <PendingExpensesTableRowSkeleton />
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
}

export function GraphSkeleton() {

    const { screenWidth } = useScreenWidth();

    return (
        <div className={clsx(
            'rounded-lg bg-gray-100 p-2 md:p-4',
            {
                'h-1/2 w-full': screenWidth < 600,
                'h-full w-1/2': screenWidth >= 600
            }
        )}>
            <div className="h-full w-full rounded-md bg-white"></div>
        </div>
    )
}

export function TotalExpenseSkeleton() {
    return (
        <div className="w-60 h-6 md:w-80 md:h-8 rounded-lg bg-gray-100"></div>
    )
}