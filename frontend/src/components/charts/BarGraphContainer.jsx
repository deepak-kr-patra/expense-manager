import clsx from "clsx";
import useScreenWidth from "../../zustand/useScreenwidth";
import BarGraph from "./BarGraph";
import BarGraphDropdown from "./dropdowns/BarGraphDropdown";


const BarGraphContainer = ({ expenses }) => {

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
                <h3 className="text-sm lg:text-md">Monthly Expenses</h3>
                <BarGraphDropdown />
            </div>
            <div className="flex h-auto grow items-center justify-center rounded-md bg-white pl-2">
                {expenses.length === 0 ?
                    <h3>No Monthly Expenses</h3>
                    :
                    <BarGraph expenses={expenses} />
                }
            </div>
        </div>
    )
}

export default BarGraphContainer