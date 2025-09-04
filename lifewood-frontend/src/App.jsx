import React from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import AppRouter from './Router';
// The EasterEgg component and hooks are no longer imported or used here

function App() {
    // All the useState and useEffect logic for the Easter egg has been removed.
    return (
        <Router>
            <AppRouter />
        </Router>
    );
}

export default App;