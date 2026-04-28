import React from 'react';
import Navbar from '../Components/Navbar/Navbar';

const AuthLayout = ({ children }) => {
    return (
        <div>
            <Navbar />
            {children}
        </div>
    );
};

export default AuthLayout;