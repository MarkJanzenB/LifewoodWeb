import React from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import AppRouter from './Router';

function App() {
    return (
        <Router>
            {/* The AppRouter now controls all layouts and content */}
            <AppRouter />
        </Router>
    );
}

export default App;