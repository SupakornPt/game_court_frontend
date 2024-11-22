import React from 'react'
import logo from '../Pages/MyAnimation.gif'
import { ExploreButton } from '../components/ExploreButton'
import { Link } from 'react-router-dom'

function LandingPage() {
    return (
        <div className='h-screen'>
            {/* HEADER */}
            <div className='flex flex-row justify-between h-28 items-center'>
                {/* LOGO */}
                <div className='w-[100px] ml-[100px] lg:w-[80px]'>
                    <img src="https://res.cloudinary.com/dxfryzi0g/image/upload/v1732258448/yexririudcdiarurnptm.png" alt="LogoPic" className='w-full' />
                </div>
                {/* SKIP BUTTON */}
                <div className='mr-[100px]'>
                    <Link to="/user"><ExploreButton /></Link>
                </div>
            </div >
            {/* CONTENT BOX */}
            <div className='flex flex-row justify-between h-4/6 px-[100px] mt-[60px] lg:mt-[20px]' >
                <div className='w-1/2 bg-red-300 flex'>
                    <img src={logo} alt="loading..." className='w-full' />
                </div>
                <div className='w-1/2 flex flex-col justify-evenly items-center'>
                    <h1 className='font-chewy text-6xl text-center lg:text-4xl'>"Make a magic moment with your friends"</h1>
                    <div className='w-full flex flex-col gap-[50px] items-center'>
                        <Link to="/register" className="text-3xl text-white font-poppins text-bold bg-blue-700 p-5 w-3/5 rounded-[30px] shadow-[0px_10px_0px_0px_blue] hover:text-blue-700 hover:bg-blue-300 hover:border active:shadow active:transition-all hover:duration-500 text-center lg:text-xl lg:p-2">
                            REGISTER
                        </Link>
                        <Link to="/login" className="text-3xl text-blue-700 font-poppins text-bold border border-blue-700 py-5 w-3/5 rounded-[30px] shadow-[0px_10px_0px_0px_blue] hover:text-white hover:bg-blue-700 active:shadow active:transition-all hover:duration-500 text-center lg:text-xl lg:py-2">
                            I ALREADY HAVE AN ACCOUNT
                        </Link>
                    </div>
                </div>
            </div >
            {/* FOOTER */}
            < div className='h-1.5/6' ></ div>
        </div >
    )
}

export default LandingPage