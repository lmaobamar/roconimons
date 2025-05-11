"use client"

import Link from "next/link"
import { cn } from "@/lib/utils"

const links = [
    { name: "Home", href: "/" },
    { name: "About", href: "/about" },
]

export default function Navbar() {
    return (
        <header className="sticky top-0 z-50 bg-gray-900 shadow">
            <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
                <Link href="/">
                    <span className="text-3xl font-extrabold text-white tracking-tight">
                        Roconimons
                    </span>
                </Link>
                <nav>
                    <ul className="flex space-x-8">
                        {links.map((link) => (
                            <li key={link.href}>
                                <Link
                                    href={link.href}
                                    className={cn(
                                        "text-base font-medium transition-colors",
                                        link.name === "Home"
                                            ? "text-white underline underline-offset-4"
                                            : "text-gray-400 hover:text-white hover:underline hover:underline-offset-4"
                                    )}
                                >
                                    {link.name}
                                </Link>
                            </li>
                        ))}
                    </ul>
                </nav>
            </div>
        </header>
    )
}
