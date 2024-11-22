import React from 'react'
import { Outlet } from 'react-router-dom'
import AdminNavbar from '../components/AdminNavbar'

function AdminLayout() {
    return (
        <div>
            <AdminNavbar />
            <div>
                <Outlet />
            </div>
        </div>
    )
}

export default AdminLayout