import React, { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import {
	Sun,
	Moon,
	Search,
	Command,
	Menu,
	X,
	Github,
	Twitter,
} from "lucide-react";
import { useTheme } from "../App";
import { CommandPalette } from "./CommandPalette";

interface LayoutProps {
	children: React.ReactNode;
}

export const Layout: React.FC<LayoutProps> = ({ children }) => {
	const { theme, toggleTheme } = useTheme();
	const [isSearchOpen, setIsSearchOpen] = useState(false);
	const [isScrolled, setIsScrolled] = useState(false);
	const location = useLocation();

	useEffect(() => {
		const handleScroll = () => setIsScrolled(window.scrollY > 20);
		window.addEventListener("scroll", handleScroll);
		return () => window.removeEventListener("scroll", handleScroll);
	}, []);

	useEffect(() => {
		const handleKeyDown = (e: KeyboardEvent) => {
			if ((e.metaKey || e.ctrlKey) && e.key === "k") {
				e.preventDefault();
				setIsSearchOpen(true);
			}
		};
		window.addEventListener("keydown", handleKeyDown);
		return () => window.removeEventListener("keydown", handleKeyDown);
	}, []);

	return (
		<div className="min-h-screen flex flex-col">
			<header
				className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${isScrolled ? "glass h-16 border-b border-zinc-200/50 dark:border-zinc-800/50" : "bg-transparent h-20"}`}
			>
				<div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-full flex items-center justify-between">
					<Link to="/" className="flex items-center space-x-2 group">
						<div className="w-8 h-8 bg-zinc-900 dark:bg-zinc-50 rounded-lg flex items-center justify-center rotate-45 group-hover:rotate-0 transition-transform duration-500">
							<span className="text-zinc-50 dark:text-zinc-900 font-bold text-md -rotate-45 group-hover:rotate-0 transition-transform duration-500">
								H
							</span>
						</div>
						<span className=" text-lg font-bold tracking-tight">Articles</span>
					</Link>

					<nav className="hidden md:flex items-center space-x-8 text-sm font-medium">
						<Link
							to="/"
							className="hover:text-zinc-500 dark:hover:text-zinc-400 transition-colors"
						>
							Articles
						</Link>
						<Link
							to="/category/engineering"
							className="hover:text-zinc-500 dark:hover:text-zinc-400 transition-colors"
						>
							Engineering
						</Link>
						<Link
							to="/category/design"
							className="hover:text-zinc-500 dark:hover:text-zinc-400 transition-colors"
						>
							Design
						</Link>
						<Link
							to="/category/philosophy"
							className="hover:text-zinc-500 dark:hover:text-zinc-400 transition-colors"
						>
							Philosophy
						</Link>
					</nav>

					<div className="flex items-center space-x-2">
						<button
							onClick={() => setIsSearchOpen(true)}
							className="p-2 hover:bg-zinc-100 dark:hover:bg-zinc-900 rounded-full transition-colors flex items-center space-x-2 group"
						>
							<Search
								size={18}
								className="text-zinc-500 group-hover:text-zinc-900 dark:group-hover:text-zinc-100"
							/>
							<div className="hidden lg:flex items-center space-x-1 px-1.5 py-0.5 bg-zinc-100 dark:bg-zinc-800 rounded border border-zinc-200 dark:border-zinc-700 text-[10px] font-mono text-zinc-400">
								<Command size={10} />
								<span>K</span>
							</div>
						</button>

						<button
							onClick={toggleTheme}
							className="p-2 hover:bg-zinc-100 dark:hover:bg-zinc-900 rounded-full transition-all duration-500 overflow-hidden"
						>
							<AnimatePresence mode="wait">
								{theme === "light" ? (
									<motion.div
										key="sun"
										initial={{ y: 20, opacity: 0, rotate: 45 }}
										animate={{ y: 0, opacity: 1, rotate: 0 }}
										exit={{ y: -20, opacity: 0, rotate: -45 }}
									>
										<Sun size={20} />
									</motion.div>
								) : (
									<motion.div
										key="moon"
										initial={{ y: 20, opacity: 0, rotate: 45 }}
										animate={{ y: 0, opacity: 1, rotate: 0 }}
										exit={{ y: -20, opacity: 0, rotate: -45 }}
									>
										<Moon size={20} />
									</motion.div>
								)}
							</AnimatePresence>
						</button>
					</div>
				</div>
			</header>

			<main className="flex-grow pt-24 pb-12">
				<AnimatePresence mode="wait">
					<motion.div
						key={location.pathname}
						initial={{ opacity: 0, y: 10 }}
						animate={{ opacity: 1, y: 0 }}
						exit={{ opacity: 0, y: -10 }}
						transition={{ duration: 0.3, ease: [0.23, 1, 0.32, 1] }}
					>
						{children}
					</motion.div>
				</AnimatePresence>
			</main>

			<footer className="border-t border-zinc-100 dark:border-zinc-900 py-12">
				<div className="max-w-7xl mx-auto px-4 flex flex-col md:flex-row justify-between items-center text-sm text-zinc-500 space-y-4 md:space-y-0">
					<div>© 2024 HUSAK. Crafted for the modern mind.</div>
					<div className="flex items-center space-x-6">
						<a
							href="#"
							className="hover:text-zinc-900 dark:hover:text-zinc-100 transition-colors"
						>
							<Twitter size={18} />
						</a>
						<a
							href="#"
							className="hover:text-zinc-900 dark:hover:text-zinc-100 transition-colors"
						>
							<Github size={18} />
						</a>
					</div>
				</div>
			</footer>

			<CommandPalette
				isOpen={isSearchOpen}
				onClose={() => setIsSearchOpen(false)}
			/>
		</div>
	);
};
