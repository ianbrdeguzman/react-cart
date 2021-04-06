import React from 'react';
import Navbar from './components/Navbar';
import CartContainer from './components/CartContainer';
import { AppProvider } from './components/context';

function App() {
    return (
        <main>
            <AppProvider>
                <Navbar />
                <CartContainer />
            </AppProvider>
        </main>
    );
}

export default App;
