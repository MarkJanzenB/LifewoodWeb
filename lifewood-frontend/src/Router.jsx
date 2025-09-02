import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import About from './pages/About';
import Projects from './pages/Projects';
import Apply from './pages/Apply';
import AdminLogin from './pages/admin/AdminLogin';
import AdminDashboard from './pages/admin/AdminDashboard';
import AdminLayout from './components/layouts/AdminLayout'; // <-- IMPORT THE NEW LAYOUT

const AppRouter = () => {
    return (
        <Routes>
            {/* Public Routes */}
            <Route path="/" element={<Home />} />
            <Route path="/about" element={<About />} />
            <Route path="/projects" element={<Projects />} />
            <Route path="/apply" element={<Apply />} />

            {/* --- WRAP ADMIN ROUTES WITH THE LAYOUT --- */}
            <Route element={<AdminLayout />}>
                <Route path="/admin/login" element={<AdminLogin />} />
                <Route path="/admin/dashboard" element={<AdminDashboard />} />
            </Route>
        </Routes>
    );
};

export default AppRouter;