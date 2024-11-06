import SideNav from '../components/SideNav';
import BarGraph from '../components/BarGraph';
import PieChart from '../components/PieChart';
import Expenses from '../components/expenses/Expenses';
import useScreenWidth from '../zustand/useScreenwidth';


const Home = () => {

  const { screenWidth } = useScreenWidth();

  // const flex_dir = screenWidth < 1200 ? "flex-col" : "flex-row";
  const width = screenWidth < 1024 ? "w-full" : screenWidth < 1400 ? "w-56" : "w-64";
  const padding = screenWidth < 1024 ? "p-4 pt-0" : screenWidth < 1400 ? "p-8" : "p-10";

  return (
    <div className="flex h-screen flex-col lg:flex-row">
      <div className={`${width} h-[168px] lg:h-auto flex-none`}>
        <SideNav />
      </div>
      <div className={`grow h-[calc(100vh-168px)] lg:h-full flex flex-col lg:flex-row ${padding}`}>
        {/* browser routes */}
        <Expenses />
      </div>
    </div>
  )
}

export default Home


{/* <div className="rounded-xl bg-gray-50 p-4">
          <div className='w-full h-full rounded-md bg-white'>
            <BarGraph />
          </div>
        </div>
        <div className="rounded-xl bg-gray-50 p-4">
          <div className='w-full h-full rounded-md bg-white'>
            <PieChart />
          </div>
        </div> */}