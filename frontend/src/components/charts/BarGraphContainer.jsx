import useScreenWidth from "../../zustand/useScreenwidth";
import BarGraph from "./BarGraph";
import BarGraphDropdown from "./dropdowns/BarGraphDropdown";


const BarGraphContainer = ({ expenses }) => {

    const { screenWidth } = useScreenWidth();

    const height = screenWidth < 600 ? "" : "h-full";
    const width = screenWidth < 600 ? "w-full" : "w-1/2";

    return (
        <div className={`flex flex-col h-1/2xxx grow ${height} ${width} rounded-lg bg-gray-50 p-2 md:p-4 md:pt-2`}>
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