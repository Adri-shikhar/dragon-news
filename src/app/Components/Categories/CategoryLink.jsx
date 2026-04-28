"use client"
import React from 'react';
import Link from 'next/link';
import { usePathname } from "next/navigation";

const CategoryLink = ({ href, children }) => {
    const path = usePathname();
    const active = path === href;
    return (
        <Link
            href={href}
            className={`border-2 border-gray-200 flex items-center justify-between w-full px-3 py-2 rounded-xl text-sm font-medium transition-all duration-200
                ${active
                    ? 'bg-orange-100 text-orange-600'
                    : 'text-gray-600 hover:bg-orange-50 hover:text-orange-600'
                }`}
        >
            {children}
        </Link>
    );
};

export default CategoryLink;