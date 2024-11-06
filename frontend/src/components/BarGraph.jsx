import { VictoryAxis, VictoryBar, VictoryChart } from "victory"
import useGetExpenses from "../hooks/expenses/useGetExpenses"


const BarGraph = () => {

    const { loading, expenses } = useGetExpenses();

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

    expenses.map((expense, index) => {
        const date = new Date(expense.date);
        const month = date.getMonth() + 1;
        const year = date.getFullYear();
        const currentYear = new Date().getFullYear();

        if (year !== currentYear) {
            return;
        }
        console.log(month, "-", index, expense.amount);

        switch (month) {
            case 1:
                monthExpenses.jan += expense.amount;
                break;
            case 2:
                monthExpenses.feb += expense.amount;
                break;
            case 3:
                monthExpenses.mar += expense.amount;
                break;
            case 4:
                monthExpenses.apr += expense.amount;
                break;
            case 5:
                monthExpenses.may += expense.amount;
                break;
            case 6:
                monthExpenses.jun += expense.amount;
                break;
            case 7:
                monthExpenses.jul += expense.amount;
                break;
            case 8:
                monthExpenses.aug += expense.amount;
                break;
            case 9:
                monthExpenses.sep += expense.amount;
                break;
            case 10:
                monthExpenses.oct += expense.amount;
                break;
            case 11:
                monthExpenses.nov += expense.amount;
                break;
            case 12:
                monthExpenses.dec += expense.amount;
                break;
            default:
                break;
        }
    });

    const data = [
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

    return (
        <VictoryChart domainPadding={20}>
            <VictoryAxis
                // tickValues specifies both the number of ticks and where
                // they are placed on the axis
                tickValues={[1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12]}
                tickFormat={["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"]}
            />
            <VictoryAxis
                dependentAxis
                // tickFormat specifies how ticks should be displayed
                // tickFormat={(x) => (`$${x / 1000}k`)}
                tickFormat={(x) => (x)}
            />
            <VictoryBar
                data={data}
                // data accessor for x values
                x="month"
                // data accessor for y values
                y="expenses"
                barRatio={0.8}
                style={{
                    data: { fill: "#93C5FD" }
                }}
            // animate={{
            //     duration: 2000,
            //     onLoad: { duration: 1000 }
            // }}
            />
        </VictoryChart>
    )
}

export default BarGraph