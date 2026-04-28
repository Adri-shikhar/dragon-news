"use client"
import React from 'react';
import Link from 'next/link';
import { usePathname } from "next/navigation";

const Mylink = ({ href, children }) => {
    const path = usePathname();
    const active = path === href;
    return (
        <div className={`border-b-2 pb-1 transition-colors duration-200 ${active ? 'border-orange-500' : 'border-transparent'}`}>
            <Link
                href={href}
                className={`text-lg font-medium hover:text-orange-500 transition-colors duration-200 ${active ? 'text-orange-500' : 'text-gray-600'}`}
            >
                {children}
            </Link>
        </div>
    );
};

export default Mylink;