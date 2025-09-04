import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import Home from './pages/Home';
import About from './pages/About';
import Projects from './pages/Projects';
import Apply from './pages/Apply';
import AdminLogin from './pages/admin/AdminLogin';
import AdminDashboard from './pages/admin/AdminDashboard';
import ForceResetPassword from './pages/admin/ForceResetPassword';
import ApplicationManagement from './pages/admin/ApplicationManagement'; // This should now be correct
import AdminManagement from './pages/admin/AdminManagement';       // And this one too
import NotFound from './pages/NotFound';
import PublicLayout from './components/layouts/PublicLayout';
import AdminLayout from './components/layouts/AdminLayout';
import ProtectedRoute from './components/ProtectedRoute';

const AppRouter = () => {
    return (
        <Routes>
            {/* --- PUBLIC ROUTES --- */}
            <Route element={<PublicLayout />}>
                <Route path="/" element={<Home />} />
                <Route path="/about" element={<About />} />
                <Route path="/projects" element={<Projects />} />
                <Route path="/apply" element={<Apply />} />
                <Route path="*" element={<NotFound />} />
            </Route>

            {/* --- ADMIN ROUTES --- */}
            <Route element={<AdminLayout />}>
                <Route path="/admin/login" element={<AdminLogin />} />
                <Route path="/admin/force-reset" element={<ForceResetPassword />} />

                <Route
                    path="/admin/dashboard"
                    element={
                        <ProtectedRoute>
                            <AdminDashboard />
                        </ProtectedRoute>
                    }
                >
                    <Route index element={<Navigate to="applications" replace />} />

                    {/* Ensure the paths point to the right components */}
                    <Route path="applications" element={<ApplicationManagement />} />
                    <Route path="users" element={<AdminManagement />} />
                </Route>
            </Route>
        </Routes>
    );
};

export default AppRouter;