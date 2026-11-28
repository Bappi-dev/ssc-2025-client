import Navbar from '@/components/sheard/Navbar';
import React, { ReactNode } from 'react';

const RootLayout = ({ children }: { children: React.ReactNode }) => {
    return (
        <div>
            <Navbar></Navbar>
           {children} 
        </div>
    );
};

export default   RootLayout;