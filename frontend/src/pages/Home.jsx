import useScreenWidth from '../zustand/useScreenwidth';
import { Route, Routes } from 'react-router-dom';

import SideNav from '../components/SideNav';
import Expenses from '../components/expenses/Expenses';
import PendingExpenses from '../components/pending_expenses/PendingExpenses';
import Charts from '../components/charts/Charts';


const Home = () => {

  const { screenWidth } = useScreenWidth();

  const width = screenWidth < 1024 ? "w-full" : screenWidth < 1400 ? "w-56" : "w-64";
  const padding = screenWidth < 1024 ? "p-4 pt-0" : screenWidth < 1400 ? "p-8" : "p-10";

  return (
    <div className="flex h-screen flex-col lg:flex-row">
      <div className={`${width} h-[128px] lg:h-auto flex-none`}>
        <SideNav />
      </div>
      <div className={`grow h-[calc(100vh-128px)] lg:h-full flex flex-col lg:flex-row ${padding}`}>
        <Routes>
          <Route path="/" element={<Expenses />} />
          <Route path="pending/*" element={<PendingExpenses />} />
          <Route path="graphs/*" element={<Charts />} />
        </Routes>
      </div>
    </div>
  )
}

export default Home