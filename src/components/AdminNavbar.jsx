import React from 'react'
import { Link, useNavigate } from 'react-router-dom'
import authStore from '../store/authStore'

function AdminNavbar() {
    const navigate = useNavigate()
    const logout = authStore((state) => state.logout)
    const handleLogout = () => {
        logout()
        navigate("/loginadmin")
    }
    return (
        <div>
            <div className='flex justify-center bg-[#999999] h-[100px]'>
                <div className='flex flex-row justify-between text-3xl w-11/12 items-center'>
                    <div className='text-white font-fredoka font-bold text-4xl'>Game Court</div>
                    <Link to="/admin" className='text-2xl text-menu font-poppins font-bold hover:underline'>Product</Link>
                    <Link to="/admin/track" className='text-2xl text-menu font-poppins font-bold hover:underline'>Track</Link>
                    <button className='text-white text-xl bg-[#686868] p-1 font-poppins font-bold' onClick={handleLogout} >Log out</button>
                </div>
            </div>
        </div>
    )
}

export default AdminNavbar