import { VictoryAxis, VictoryBar, VictoryChart, VictoryTheme } from "victory"
import formatDateToLocal from "../../utils/formatDateToLocal";
import useChartsDetails from "../../zustand/useChartsDetails";
import useScreenWidth from "../../zustand/useScreenwidth";


const BarGraph = ({ expenses }) => {

    const { barGraphPeriod } = useChartsDetails();
    const { screenWidth } = useScreenWidth();
    let barGraphExpenses = [];

    const monthExpenses = {
        jan: 0,
        feb: 0,
        mar: 0,
        apr: 0,
        may: 0,
        jun: 0,
        jul: 0,
        aug: 0,
        sep: 0,
        oct: 0,
        nov: 0,
        dec: 0
    };

    expenses.map((expense) => {
        const date = new Date(expense.date);
        const year = date.getFullYear();
        const currentYear = new Date().getFullYear();

        if (barGraphPeriod === 'This Year' && year !== currentYear) {
            return;
        }

        barGraphExpenses.push(expense);
    });

    barGraphExpenses.map((barExpense) => {
        let month = formatDateToLocal(barExpense.date).substring(0, 3).toLowerCase();
        monthExpenses[month] += barExpense.amount;
    });

    const graphData = [
        { month: 1, expenses: monthExpenses.jan },
        { month: 2, expenses: monthExpenses.feb },
        { month: 3, expenses: monthExpenses.mar },
        { month: 4, expenses: monthExpenses.apr },
        { month: 5, expenses: monthExpenses.may },
        { month: 6, expenses: monthExpenses.jun },
        { month: 7, expenses: monthExpenses.jul },
        { month: 8, expenses: monthExpenses.aug },
        { month: 9, expenses: monthExpenses.sep },
        { month: 10, expenses: monthExpenses.oct },
        { month: 11, expenses: monthExpenses.nov },
        { month: 12, expenses: monthExpenses.dec }
    ];

    const formatCurrencyLabel = (value) => {
        if (value >= 1000_000) {
            return `₹${value / 1000_000}m`;
        } else if (value >= 10_000 && value < 1000_000) {
            return `₹${value / 1000}k`;
        } else {
            return `₹${value}`;
        }
    };

    return (
        <>
            {barGraphExpenses.length === 0 && <h3 className="text-sm">No expense made in this period!</h3>}

            {barGraphExpenses.length > 0 &&
                <VictoryChart
                    domainPadding={20}
                    theme={VictoryTheme.clean}
                    height={screenWidth < 600 ? 230 : 350}
                >
                    <VictoryAxis
                        // tickValues specifies both the number of ticks and where
                        // they are placed on the axis
                        tickValues={[1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12]}
                        tickFormat={["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"]}
                    />
                    <VictoryAxis
                        dependentAxis
                        // tickFormat specifies how ticks should be displayed
                        tickFormat={(x) => formatCurrencyLabel(x)}
                    />
                    <VictoryBar
                        data={graphData}
                        // data accessor for x values
                        x="month"
                        // data accessor for y values
                        y="expenses"
                        barRatio={0.8}
                        animate={{
                            duration: 1000,
                            onLoad: { duration: 500 }
                        }}
                    />
                </VictoryChart>
            }
        </>
    )
}

export default BarGraph