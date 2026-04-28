import React from 'react';
import Link from 'next/link';

const Mylink = ({href, children}) => {
    return (
        <div>
            <Link href={href}>{children}</Link>
        </div>
    );
};

export default Mylink;