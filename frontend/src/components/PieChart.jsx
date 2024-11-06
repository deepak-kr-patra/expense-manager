import { VictoryPie } from "victory";


const PieChart = () => {

    const data = [
        { x: "Food", y: 35 },
        { x: "Clothing", y: 40 },
        { x: "Personal", y: 55 },
        { x: "Mobile", y: 50 },
        { x: "Fuel", y: 45 },
        { x: "Others", y: 60 },
    ];

    return (
        <VictoryPie
            colorScale={["tomato", "orange", "gold", "cyan", "navy", "lime"]}
            data={data}
        />
    )
}

export default PieChart