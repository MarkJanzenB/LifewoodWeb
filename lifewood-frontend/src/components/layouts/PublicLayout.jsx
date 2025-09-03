import React from 'react';
import { Outlet } from 'react-router-dom';
import Header from '../Header'; // The original public header
import Footer from '../Footer';

const PublicLayout = () => {
    return (
        <>
            <Header />
            <main>
                <Outlet /> {/* Public pages like Home, About, etc. will render here */}
            </main>
            <Footer />
        </>
    );
};

export default PublicLayout;