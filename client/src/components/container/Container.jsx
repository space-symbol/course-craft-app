import React from 'react';
import "./container.css"
const Container = ({children}) => {
    return (
        <main className="container">
            {children}
        </main>
    );
};

export default Container;
