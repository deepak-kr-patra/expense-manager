import clsx from "clsx"
import useGetExpenses from "../../hooks/expenses/useGetExpenses"
import formatCurrency from "../../utils/formatCurrency"
import useScreenWidth from "../../zustand/useScreenwidth"
import { GraphSkeleton, TotalExpenseSkeleton } from "../Skeletons"
import BarGraphContainer from "./BarGraphContainer"
import PieChartContainer from "./PieChartContainer"


const Charts = () => {

    const { loading, expenses } = useGetExpenses();
    const { screenWidth } = useScreenWidth();

    let total_expense = 0;

    expenses.map((expense) => {
        total_expense += expense.amount;
    });

    // const flex_dir = screenWidth < 600 ? "flex-col" : "flex-row";
    // const scrollable = screenWidth < 600 ? "overflow-y-scroll" : "";

    return (
        <div className="w-full h-full flex flex-col">
            <div className="flex w-full h-10 items-center justify-between">
                {loading && <TotalExpenseSkeleton />}

                {!loading && expenses.length === 0 && (
                    <h1 className="text-lg lg:text-2xl page-heading">No Expense Made!</h1>
                )}

                {!loading && expenses.length > 0 && (
                    <h1 className="text-lg lg:text-2xl page-heading">
                        Total Expense: {formatCurrency(total_expense)}
                    </h1>
                )}
            </div>
            <div
                // className={`h-[calc(100vh-168px)] lg:mt-8 flex ${flex_dir} ${scrollable} w-full md:grow md:h-auto items-center justify-start md:justify-center gap-2 lg:gap-6`}
                className={clsx(
                    'h-[calc(100vh-168px)] lg:mt-8 flex w-full md:grow md:h-auto items-center justify-start md:justify-center gap-2 lg:gap-6 graphs-boxxxx',
                    {
                        'flex-col overflow-y-scroll': screenWidth < 600,
                        'flex-row': screenWidth >= 600
                    }
                )}
            >
                {loading ?
                    <>
                        <GraphSkeleton />
                        <GraphSkeleton />
                    </>
                    :
                    <>
                        <BarGraphContainer expenses={expenses} />
                        <PieChartContainer expenses={expenses} />
                    </>
                }
            </div>
        </div>
    )
}

export default Charts