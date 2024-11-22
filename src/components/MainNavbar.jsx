import React from 'react'
import { Link, useNavigate } from 'react-router-dom'
import authStore from '../store/authStore'

function MainNavbar(props) {
    const token = authStore((state) => state.token)
    const navigate = useNavigate()
    const logout = authStore((state) => state.logout)
    const handleLogout = () => {
        logout();
        navigate("/login")
    };

    return (
        <div>
            <div className='flex flex-row items-center justify-between h-28'>
                <div className='flex flex-row justify-between gap-28 lg:gap-12 items-center'>
                    <div className='w-[100px] lg:w-[80px] ml-[100px] flex flex-row items-center'>
                        <img src="https://res.cloudinary.com/dxfryzi0g/image/upload/v1728452722/Main%20nav%20and%20Footer/Logo.png" alt="LogoPic" className='w-full' />
                    </div>
                    <div className='text-2xl lg:text-xl font-poppins flex flex-row font-semibold justify-between gap-24 lg:gap-12 text-menu'>
                        <Link to="/user">Shop</Link>
                        {(token === "")
                            ? <div><Link to="/login">Sign in</Link></div>
                            : <div className='flex flex-row gap-10'>
                                <Link to="/user/track">Tracking</Link>
                                <Link to="/user/profile">Profile</Link>
                            </div>
                        }
                    </div>
                </div>
                <div className='w-[35px] lg:w-[25px] h-[35px] lg:h-[25px] mr-[100px] bg-white'>
                    <img src="https://res.cloudinary.com/dxfryzi0g/image/upload/v1728452722/Main%20nav%20and%20Footer/close.png" alt="logoutButton" className='w-full' onClick={handleLogout} />
                </div>
            </div>
            <div className='border-b-2 lg:border-b-1 border-gray-300 w-11/12 mx-auto'></div>
        </div>
    )
}

export default MainNavbar