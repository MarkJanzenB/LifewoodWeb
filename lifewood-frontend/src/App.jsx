import React from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import Header from './components/Header';
import Footer from './components/Footer';
import AppRouter from './Router'; // Import the centralized router

function App() {
    return (
        <Router>
            <Header />
            <main>
                <AppRouter /> {/* Render the AppRouter component here */}
            </main>
            <Footer />
        </Router>
    );
}

export default App;