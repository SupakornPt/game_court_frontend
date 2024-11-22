import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'

function ConfirmPaymentSheet() {
    const navigate = useNavigate()

    const hdlOntrack = () => {
        navigate("/user/track")
    }

    const hdlOnShop = () => {
        navigate("/user")
    }


    return (
        <div className='flex flex-col font-poppins gap-6 font-medium  text-menu mt-8'>
            <div className='text-xl'>Your order has been successfully placed!
                Thank you for your order, we are preparing your item and it will be on its way to you soon.
            </div>
            <div className='flex flex-col text-xl items-start gap-1'>
                <div>You can check your status item on tracking page.</div>
                <div>We will updated your status item as soon as possible.</div>
                <button onClick={hdlOntrack} className="underline hover:text-blue-500">Go to tracking page</button>
            </div>
            <div>
                <button onClick={hdlOnShop} className='text-xl underline hover:text-blue-500'>Continue to shopping</button>
            </div>
        </div>
    )
}

export default ConfirmPaymentSheet