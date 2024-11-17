import {
    ChartPieIcon,
    DocumentCurrencyRupeeIcon,
    CalendarDaysIcon,
} from '@heroicons/react/24/outline';
import { Link, useLocation } from 'react-router-dom';
import clsx from 'clsx';


// Map of links to display in the side navigation.
// Depending on the size of the application, this would be stored in a database.
const links = [
    { name: 'Graph', href: '/dashboard', icon: ChartPieIcon },
    { name: 'Expenses', href: '/dashboard/expenses', icon: DocumentCurrencyRupeeIcon, },
    { name: 'Pending', href: '/dashboard/pending', icon: CalendarDaysIcon },
];

export default function NavLinks() {
    const pathname = useLocation().pathname;

    return (
        <>
            {links.map((link) => {
                const LinkIcon = link.icon;
                return (
                    <Link
                        key={link.name}
                        to={link.href}
                        className={clsx(
                            'flex h-[40px] grow items-center justify-center gap-1 lg:gap-2 rounded-md bg-gray-50 text-sm font-medium hover:bg-sky-100 hover:text-blue-600 lg:flex-none lg:justify-start p-2 lg:p-2 lg:px-3',
                            {
                                'bg-sky-100 text-blue-600': pathname === link.href,
                            },
                        )}
                    >
                        <LinkIcon className="w-4 lg:w-6" />
                        <p className="text-sm lg:text-md navbar-options">{link.name}</p>
                    </Link>
                );
            })}
        </>
    );
}