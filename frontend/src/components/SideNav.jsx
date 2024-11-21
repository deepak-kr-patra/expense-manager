import { Link } from 'react-router-dom';
import { ArrowLeftStartOnRectangleIcon } from '@heroicons/react/24/outline';
import NavLinks from './NavLinks';
import LogOutModal from './LogOutModal';


export default function SideNav() {

    const toggleLogoutModal = () => {
        const logoutModal = document.getElementById('logout-modal-container');

        logoutModal.classList.contains('show-modal-container') ? logoutModal.classList.remove('show-modal-container') : logoutModal.classList.add('show-modal-container');
    };

    return (
        <div className="flex h-full flex-col px-3 py-4 pb-0 lg:pb-4 lg:px-2">
            <Link
                className="mb-2 flex h-14 items-end justify-start rounded-md bg-blue-600 p-4 px-2 lg:h-40"
                to="/"
            >
                <div className="w-full flex items-center justify-center gap-3 text-white lg:w-full">
                    <p className='logo-header'>Expense Manager</p>
                </div>
            </Link>
            <div className={`flex grow flex-row justify-between space-x-2 lg:flex-col lg:space-x-0 lg:space-y-2`}>
                <NavLinks />
                <div className="hidden h-auto w-full grow rounded-md bg-gray-100 lg:block"></div>
                <button
                    className="flex h-[40px] items-center justify-center gap-2 rounded-md bg-gray-100 p-3 text-sm font-medium hover:bg-sky-100 hover:text-blue-600 lg:flex-none lg:justify-start lg:p-2 lg:px-3"
                    onClick={() => toggleLogoutModal()}
                >
                    <ArrowLeftStartOnRectangleIcon className='w-4 lg:w-6' />
                    <div className="hidden lg:block">Sign Out</div>
                </button>
            </div>

            <LogOutModal toggleLogoutModal={toggleLogoutModal} />
        </div>
    );
}