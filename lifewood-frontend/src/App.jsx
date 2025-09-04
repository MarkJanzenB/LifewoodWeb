import React, { useState, useEffect } from 'react'; // <-- Import useState and useEffect
import { BrowserRouter as Router } from 'react-router-dom';
import AppRouter from './Router';
import EasterEgg from './components/EasterEgg.jsx'; // <-- Import the new component

function App() {
    const [isEggVisible, setIsEggVisible] = useState(false);
    const [sequence, setSequence] = useState('');
    const secretCode = 'lifewood'; // The secret word to type

    useEffect(() => {
        const handleKeyDown = (event) => {
            const newSequence = sequence + event.key.toLowerCase();

            // Check if the end of the sequence matches the secret code
            if (newSequence.endsWith(secretCode)) {
                setIsEggVisible(true); // Show the modal!
                setSequence(''); // Reset for next time
            } else {
                // Keep the sequence from getting too long
                setSequence(newSequence.slice(-secretCode.length));
            }
        };

        // Add the event listener when the component mounts
        window.addEventListener('keydown', handleKeyDown);

        // This is a cleanup function to remove the listener when the component unmounts
        return () => {
            window.removeEventListener('keydown', handleKeyDown);
        };
    }, [sequence]); // Rerun the effect if the sequence changes

    return (
        <Router>
            <AppRouter />

            {/* Render the Easter Egg modal (it will only be visible when isEggVisible is true) */}
            <EasterEgg isOpen={isEggVisible} onClose={() => setIsEggVisible(false)} />
        </Router>
    );
}

export default App;