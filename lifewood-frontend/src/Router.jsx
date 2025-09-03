import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import Home from './pages/Home';
import About from './pages/About';
import Projects from './pages/Projects';
import Apply from './pages/Apply';
import AdminLogin from './pages/admin/AdminLogin';
import AdminDashboard from './pages/admin/AdminDashboard';
import ForceResetPassword from './pages/admin/ForceResetPassword';
import ApplicationManagement from './pages/admin/ApplicationManagement';
import AdminManagement from './pages/admin/AdminManagement';
import PublicLayout from './components/layouts/PublicLayout';
import AdminLayout from './components/layouts/AdminLayout';
import NotFound from './pages/NotFound'; // <-- IMPORT THE 404 PAGE



const AppRouter = () => {
    return (
        <Routes>
            <Route element={<PublicLayout />}>
                <Route path="/" element={<Home />} />
                <Route path="/about" element={<About />} />
                <Route path="/projects" element={<Projects />} />
                <Route path="/apply" element={<Apply />} />
                <Route path="*" element={<NotFound />} />
            </Route>

            <Route element={<AdminLayout />}>
                <Route path="/admin/login" element={<AdminLogin />} />
                <Route path="/admin/force-reset" element={<ForceResetPassword />} />
                <Route path="/admin/dashboard" element={<AdminDashboard />}>
                    <Route index element={<Navigate to="applications" replace />} />
                    <Route path="applications" element={<ApplicationManagement />} />
                    <Route path="users" element={<AdminManagement />} />
                </Route>
            </Route>
        </Routes>
    );
};

export default AppRouter;