import React from 'react';
import Header from '../Components/Header/Header';
import Navbar from '../Components/Navbar/Navbar';

const MainLayout = ({ children }) => {
    return (
        <div>
            <Header />
            <Navbar />
            {children}
        </div>
    );
};

export default MainLayout;