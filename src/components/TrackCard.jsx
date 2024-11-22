import React, { useState } from 'react'
import Swal from 'sweetalert2'
import { updatePayment } from "../api/payment"
import authStore from '../store/authStore'

function TrackCard(props) {
    const token = authStore((state) => state.token)
    const { totalPrice, paymentData } = props

    const [slipPic, setSlipPic] = useState(null)
    const hdlUploadSlip = (e) => {
        setSlipPic(e.target.files[0])
    }

    const hdlOnSend = async () => {
        try {
            const body = new FormData()
            body.append("image", slipPic)
            const res = await updatePayment(paymentData.orderId, token, body)
            Swal.fire({
                title: "Done",
                text: 'You already uploaded a slip.',
                icon: 'success',
                confirmButtonText: 'OK'
            })
        } catch (err) {
            console.log(err)
        }
    }


    return (
        <div className='text-menu font-poppins bg-[#F5F5F5] flex flex-col p-5 gap-4'>
            <div className='text-xl font-semibold flex flex-row justify-between'>
                <div>Order no. {paymentData?.orderId}</div>
                <div>Status: {paymentData?.statuspayment}</div>
            </div>
            <div className='text-lg font-semibold'>Total price: {totalPrice}</div>
            <div className='flex flex-row justify-between'>
                <input type="file" className="file-input file-input-bordered w-full max-w-xs" onChange={hdlUploadSlip} />
                <button className='bg-[#D9D9D9] px-3 ' onClick={hdlOnSend} >Send</button>
            </div>
            <div className='text-lg font-semibold'>Track: <button className='font-medium hover:text-blue-500 hover:underline'>Check shipment</button></div>
        </div>
    )
}

export default TrackCard