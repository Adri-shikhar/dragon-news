import React from 'react';
import Header from '../Components/Header/Header';
import Navbar from '../Components/Navbar/Navbar';
import NewsMarqueee from '../Components/Marquee/Marquee';


const MainLayout = ({ children }) => {
    return (
        <div>
            <Header />
             <NewsMarqueee/>
            <Navbar />
            {children}
        </div>
    );
};

export default MainLayout;