import { create } from 'zustand';


const useChartsDetails = create((set) => ({
    barGraphPeriod: 'All Time',
    setBarGraphPeriod: (barGraphPeriod) => set({ barGraphPeriod }),
    pieChartPeriod: 'All Time',
    setPieChartPeriod: (pieChartPeriod) => set({ pieChartPeriod }),
}));

export default useChartsDetails;