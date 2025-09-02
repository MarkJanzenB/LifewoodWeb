// ... (imports)

const AdminDashboard = () => {
    // ... (existing state and hooks)

    const handleCreateAdmin = async () => {
        const newUsername = prompt("Enter the username for the new admin:");
        if (newUsername) {
            try {
                const token = localStorage.getItem('authToken');
                const response = await fetch(`${API_BASE_URL}/api/admin/users`, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': `Bearer ${token}`
                    },
                    body: JSON.stringify({ username: newUsername }),
                });

                const message = await response.text();
                if (!response.ok) throw new Error(message);

                alert(message); // "Admin user created successfully..."
            } catch (err) {
                alert(`Error: ${err.message}`);
            }
        }
    };

    // ... (existing functions like handleDelete, handleLogout)

    return (
        <div className="admin-container dashboard">
            <div className="dashboard-header">
                <h1>Application Dashboard</h1>
                <div>
                    {/* --- NEW BUTTON --- */}
                    <button className="admin-button" onClick={handleCreateAdmin}>+ Create Admin</button>
                    <button className="admin-button logout" onClick={handleLogout}>Logout</button>
                </div>
            </div>
            {/* ... rest of JSX is unchanged ... */}
        </div>
    );
};

export default AdminDashboard;