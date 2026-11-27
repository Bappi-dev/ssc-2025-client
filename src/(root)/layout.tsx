import Navbar from '@/components/sheard/Navbar';
import React from 'react';

const RootLayout = ({children}) => {
    return (
        <div>
            <Navbar></Navbar>
           {children} 
        </div>
    );
};

export default   RootLayout;