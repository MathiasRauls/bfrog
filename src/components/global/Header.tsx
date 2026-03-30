"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

import { cn } from "@/lib/utils"
import Frog from "../sprite/frog/Frog";
import "@/app/style/header.css";

const Header = () => {
	const pathname = usePathname();
	const currentPage = (path: string) => {
		return pathname === path ? true : false
	}

	return (
		<header
			className="
				w-full px-4 py-3
				flex gap-4 items-center justify-between
			"
		>
			<div className="flex gap-4 items-start" >
				<Frog scale={2} />
				<Link
					href="/"
					title="BoiledFrog™ Homepage"
				>
					<div role="brandName" className="text-4xl font-black font-decor">BoiledFrog<sup className="text-sm">™</sup></div>
				</Link>
			</div>
			<nav>
				<ul className="flex items-center gap-6">
					<li>
						<Link
							title="Homepage"
							href="/"
							className={cn("navLink font-decor text-[1.75rem]", {
								"current": currentPage("/")
							})}
							aria-current={ currentPage("/") ? true : false}
						>Home</Link>
					</li>
					<li>
						<Link
							title="Support Mr. Frog"
							href="/support"
							className={cn("navLink font-decor text-[1.75rem]", {
								"current": currentPage("/support")
							})}
							aria-current={ currentPage("/support") ? true : false}
						>Support</Link>
					</li>
					<li>
						<button
							title="Search Assets"
							className={cn("navLink font-decor text-[1.75rem] flex gap-2 items-center")}
						>
							Search
							<span
								className="
									px-1 py-.75 rounded-md
									font-mono text-sm not-dark:text-vape dark:bg-black/50
								"
							>
								<kbd>⌘</kbd>+<kbd>k</kbd>
							</span>
						</button>
					</li>
				</ul>
			</nav>
		</header>
	)
}

export default Header;