import clsx from 'clsx';
import { Route, Routes } from 'react-router-dom';
import useScreenWidth from '../zustand/useScreenwidth';

import SideNav from '../components/SideNav';
import Expenses from '../components/expenses/Expenses';
import PendingExpenses from '../components/pending_expenses/PendingExpenses';
import Charts from '../components/charts/Charts';


const Home = () => {

  const { screenWidth } = useScreenWidth();

  return (
    <div className="flex h-full flex-col lg:flex-row">
      <div className={clsx(
        'h-[128px] lg:h-auto flex-none',
        {
          "w-full": screenWidth < 1024,
          "w-56": screenWidth >= 1024 && screenWidth < 1400,
          "w-64": screenWidth >= 1400
        }
      )}>
        <SideNav />
      </div>
      <div className={clsx(
        'grow h-[calc(100dvh-128px)] lg:h-full flex flex-col lg:flex-row',
        {
          "p-4 pt-0": screenWidth < 1024,
          "p-8": screenWidth >= 1024 && screenWidth < 1400,
          "p-10": screenWidth >= 1400
        }
      )}>
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