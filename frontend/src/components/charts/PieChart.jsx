import { VictoryPie, VictoryTheme } from "victory";
import useChartsDetails from "../../zustand/useChartsDetails";
import formatDateToLocal from "../../utils/formatDateToLocal";


const PieChart = ({ expenses }) => {

    const { pieChartPeriod } = useChartsDetails();

    const categoryExpenses = {
        food: 0,
        clothing: 0,
        home: 0,
        travel: 0,
        study: 0,
        others: 0
    };

    expenses.map((expense) => {
        let date = new Date(expense.date);
        let year = date.getFullYear();
        let currentYear = new Date().getFullYear();
        let month = formatDateToLocal(date).substring(0, 3);
        let currentMonth = formatDateToLocal(new Date()).substring(0, 3);

        if (pieChartPeriod === 'This Year' && year !== currentYear) {
            return;
        } else if (pieChartPeriod === 'This Month' && month !== currentMonth) {
            return;
        }

        const category = expense.category;
        categoryExpenses[category] += expense.amount;
    });

    const pieChartData = [
        { x: "Food", y: categoryExpenses.food },
        { x: "Clothing", y: categoryExpenses.clothing },
        { x: "Home", y: categoryExpenses.home },
        { x: "Travel", y: categoryExpenses.travel },
        { x: "Study", y: categoryExpenses.study },
        { x: "Others", y: categoryExpenses.others },
    ];

    return (
        <div className="h-32 lg:h-full flex items-center justify-between lg:pr-8">
            <VictoryPie
                colorScale={["#2D7FF9", "#FF08C2", "#20D9D2", "#8B46FF", "#20C933", "#FF6F2C"]}
                data={pieChartData}
                radius={100}
                innerRadius={50}
                theme={VictoryTheme.clean}
                labels={() => null}
            />
            <div className="flex flex-col items-start justify-center p-4">
                <div className="flex items-center justify-center p-0.5 md:p-1 gap-1 md:gap-2">
                    <div className="color-square bg-[#2D7FF9]"></div>
                    <h3 className="square-text">Food</h3>
                </div>
                <div className="flex items-center justify-center p-0.5 md:p-1 gap-1 md:gap-2">
                    <div className="color-square bg-[#FF08C2]"></div>
                    <h3 className="square-text">Clothing</h3>
                </div>
                <div className="flex items-center justify-center p-0.5 md:p-1 gap-1 md:gap-2">
                    <div className="color-square bg-[#20D9D2]"></div>
                    <h3 className="square-text">Home</h3>
                </div>
                <div className="flex items-center justify-center p-0.5 md:p-1 gap-1 md:gap-2">
                    <div className="color-square bg-[#8B46FF]"></div>
                    <h3 className="square-text">Travel</h3>
                </div>
                <div className="flex items-center justify-center p-0.5 md:p-1 gap-1 md:gap-2">
                    <div className="color-square bg-[#20C933]"></div>
                    <h3 className="square-text">Study</h3>
                </div>
                <div className="flex items-center justify-center p-0.5 md:p-1 gap-1 md:gap-2">
                    <div className="color-square bg-[#FF6F2C]"></div>
                    <h3 className="square-text">Others</h3>
                </div>
            </div>
        </div>
    )
}

export default PieChart