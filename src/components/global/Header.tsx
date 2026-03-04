'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';

import { cn } from '@/lib/utils'
import Frog from '../sprite/frog/Frog';
import '@/app/style/header.css';

const Header = () => {
	const pathname = usePathname();
	const currentPage = (path: string) => {
		return pathname === path ? true : false
	}

	return (
		<header
			className='
				w-full px-4 py-3
				flex gap-4 items-center justify-between
			'
		>
			<Link
				href='/'
				title='Home'
				className='flex gap-4 items-start'
			>
				<Frog scale={2} />
				<div role='brandName' className='text-4xl font-black font-decor'>BoiledFrog<sup className='text-sm'>™</sup></div>
			</Link>
			<nav>
				<ul className='flex items-center gap-3'>
					<li>
						<Link
							href='/'
							className={cn('navLink font-decor text-[1.75rem]', {
								'current': currentPage("/")
							})}
							aria-current={ currentPage("/") ? true : false}
						>Home</Link>
					</li>
					<li>
						<Link
							title='Support our Frog'
							href='/support'
							className={cn('navLink font-decor text-[1.75rem]', {
								'current': currentPage("/support")
							})}
							aria-current={ currentPage("/support") ? true : false}
						>Support</Link>
					</li>
				</ul>
			</nav>
		</header>
	)
}

export default Header;