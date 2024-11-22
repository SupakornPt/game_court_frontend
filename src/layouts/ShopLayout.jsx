import React from 'react'
import MainNavbar from '../components/MainNavbar'
import SubNavbar from '../components/SubNavbar'
import Footer from '../components/Footer'
import { Outlet } from 'react-router-dom'

function ShopLayout() {
    return (
        <div>
            <MainNavbar />
            <SubNavbar />
            <div className='w-11/12 mx-auto'>
                <Outlet />
            </div>
            <div className='absolute bottom-0 w-full'>
                <Footer />
            </div>
        </div>
    )
}

export default ShopLayout