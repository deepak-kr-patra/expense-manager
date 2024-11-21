import { VictoryPie, VictoryTheme } from "victory";
import useChartsDetails from "../../zustand/useChartsDetails";
import formatDateToLocal from "../../utils/formatDateToLocal";
import CategoryBox from "./CategoryBox";


const PieChart = ({ expenses }) => {

    const { pieChartPeriod } = useChartsDetails();
    let pieChartExpenses = [];

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

        pieChartExpenses.push(expense);
    });

    pieChartExpenses.map((pieExpense) => {
        const category = pieExpense.category;
        categoryExpenses[category] += pieExpense.amount;
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
        <>
            {pieChartExpenses.length === 0 && <h3 className="text-sm">No expense made in this period!</h3>}

            {pieChartExpenses.length > 0 &&
                <div className="h-32nnn lg:h-fullxxx flex items-center justify-between pr-4 lg:pr-8">
                    <VictoryPie
                        colorScale={["#2D7FF9", "#FF08C2", "#20D9D2", "#8B46FF", "#20C933", "#FF6F2C"]}
                        data={pieChartData}
                        radius={100}
                        innerRadius={50}
                        theme={VictoryTheme.clean}
                        labels={() => null}
                    />
                    <CategoryBox />
                </div>
            }
        </>
    )
}

export default PieChart