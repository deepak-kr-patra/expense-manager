import clsx from "clsx";
import useScreenWidth from "../../zustand/useScreenwidth";
import PieChart from "./PieChart";
import PieChartDropdown from "./dropdowns/PieChartDropdown";


const PieChartContainer = ({ expenses }) => {

    const { screenWidth } = useScreenWidth();

    return (
        <div className={clsx(
            'flex flex-col grow rounded-lg bg-gray-100 p-2 md:p-4 md:pt-2',
            {
                'w-full': screenWidth < 600,
                'h-full w-1/2': screenWidth >= 600
            }
        )}>
            <div className="flex items-center justify-between p-0 pb-2 md:p-1 md:pb-3">
                <h3 className="text-sm lg:text-md">Expenses by Category</h3>
                <PieChartDropdown />
            </div>
            <div className="flex h-auto grow items-center justify-center rounded-md bg-white">
                {expenses.length === 0 ?
                    <h3>No Expenses by Category</h3>
                    :
                    <PieChart expenses={expenses} />
                }
            </div>
        </div>
    )
}

export default PieChartContainer