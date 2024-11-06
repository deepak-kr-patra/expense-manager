import { Link } from 'react-router-dom';
import { PowerIcon } from '@heroicons/react/24/outline';
import NavLinks from './NavLinks';
import useLogout from '../hooks/auth/useLogout';
import useScreenWidth from '../zustand/useScreenwidth';


export default function SideNav() {

    const { loading, logout } = useLogout();

    const { screenWidth } = useScreenWidth();

    const flex_dir = screenWidth < 1200 ? "flex-row" : "flex-col";

    return (
        <div className="flex h-full flex-col px-3 py-4 lg:px-2">
            <Link
                className="mb-2 flex h-20 items-end justify-start rounded-md bg-blue-600 p-4 lg:h-40"
                to="/"
            >
                <div className="w-32 text-white lg:w-40">
                    {/* <AcmeLogo /> */}
                </div>
            </Link>
            <div className={`flex grow flex-row justify-between space-x-2 lg:flex-col lg:space-x-0 lg:space-y-2`}>
                <NavLinks />
                <div className="hidden h-auto w-full grow rounded-md bg-gray-50 lg:block"></div>
                {/* <form onSubmit={() => logout()}> */}
                <button
                    type='submit'
                    className="flex h-[48px] w-fullmmm growxxx items-center justify-center gap-2 rounded-md bg-gray-50 p-3 text-sm font-medium hover:bg-sky-100 hover:text-blue-600 lg:flex-none lg:justify-start lg:p-2 lg:px-3"
                    onClick={() => logout()}
                >
                    <PowerIcon className="w-6" />
                    <div className="hidden lg:block">Sign Out</div>
                </button>
                {/* </form> */}
            </div>
        </div>
    );
}