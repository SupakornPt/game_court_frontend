import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { createPayment, getBankOption } from '../api/payment'
import authStore from '../store/authStore'
import { getOrderData } from '../api/payment'
import Swal from 'sweetalert2'
import cartStore from '../store/cartStore'


function PaymentSheet() {
    const clearCart = cartStore((state) => state.clearCart)
    const token = authStore((state) => state.token)
    const { orderId } = useParams()
    const navigate = useNavigate()
    console.log("Param", orderId)
    const [bankData, setBankData] = useState([])
    const [selectBank, setSelectBank] = useState(0)
    const [profileData, setProfileData] = useState({
        firstName: "",
        lastName: "",
        phone: "",
        addressHome: "",
        subDistrict: "",
        district: "",
        province: "",
        postal: "",
    })
    const [orderData, setOrderData] = useState({})
    // const [isAddress, setIsAddress] = useState(false)

    const hdlOnChange = (e) => {
        console.log(e.target.name)
        console.log(e.target.value)
        setProfileData({
            ...profileData,
            [e.target.name]: e.target.value
        })
    }

    const getBankOptionData = async () => {
        try {
            const resp = await getBankOption(token)
            setBankData(resp.data)
        } catch (err) {
            console.log(err)
        }
    }



    const getOrderDataFn = async () => {
        const resp = await getOrderData(orderId, token)
        setOrderData(resp.data?.getOrderId)
        setProfileData(resp.data?.getAddress?.address[0])
        // setIsAddress(resp.data?.getAddress?.address[0] ? true : false)

    }

    const [slipPic, setSlipPic] = useState(null)

    const hdlUploadSlip = (e) => {
        console.log(e.target.files)
        setSlipPic(e.target.files[0])
    }

    useEffect(() => {
        getBankOptionData()
        getOrderDataFn()

    }, [])

    const [isOpenAdd, setIsOpenAdd] = useState(false)
    const toggleAdd = () => {
        setIsOpenAdd(!isOpenAdd)
    }

    const [isOpenPay, setIsOpenPay] = useState(false)
    const togglePay = () => {
        setIsOpenPay(!isOpenPay)
    }

    const [isOpenSlip, setIsOpenSlip] = useState(false)
    const toggleSlip = () => {
        setIsOpenSlip(!isOpenSlip)
    }

    const hdlSelectBank = (index) => {
        setSelectBank(index)
    }

    const hdlConfirmPayment = async () => {
        try {
            const body = new FormData()
            body.append("image", slipPic);
            body.append("profileData", JSON.stringify(profileData))
            const res = await createPayment(orderId, token, body)
            navigate("/user/confirmpayment")
            clearCart()

        } catch (err) {
            console.log(err)
            Swal.fire({
                title: err.response.data.error || err.response.data.message,
                text: 'Do you want to continue',
                icon: 'error',
                confirmButtonText: 'OK'
            })
        }
    }
    console.log("profileData", profileData)
    return (
        <div className='font-poppins overflow-y-scroll  h-[calc(100vh-196px)]'>
            {/* ORDER */}
            <div className='flex flex-row justify-between text-2xl font-bold my-5'>
                <div>Order number is {orderId}</div>
                <div>Total {orderData.totalPrice} baht</div>
            </div>
            {/* <div className=' flex flex-row gap-2 text-xl font-semibold mb-3'>
                <input type="checkbox" disabled={isAddress} />
                <div>Use my address</div>
            </div> */}
            {/* ADDRESS */}
            <div>
                <button className='bg-[#D9D9D9] w-full text-xl font-semibold hover:bg-yellow-300 ' onClick={toggleAdd}>Address</button>
                {isOpenAdd && (
                    <form action="">
                        <div className='flex flex-col gap-1 bg-[#F5F5F5] p-5'>
                            <label>First name</label>
                            <input type="text" name="firstName" value={profileData?.firstName} className='px-1' onChange={hdlOnChange} />
                            <label >Last name</label>
                            <input type="text" name="lastName" value={profileData?.lastName} className='px-1' onChange={hdlOnChange} />
                            <label >Phone</label>
                            <input type="text" name="phone" value={profileData?.phone} className='px-1' onChange={hdlOnChange} />
                            <label >Address</label>
                            <input type="text" name="addressHome" value={profileData?.addressHome} className='px-1' onChange={hdlOnChange} />
                            <label >Sub district</label>
                            <input type="text" name="subDistrict" value={profileData?.subDistrict} className='px-1' onChange={hdlOnChange} />
                            <label >District</label>
                            <input type="text" name="district" value={profileData?.district} className='px-1' onChange={hdlOnChange} />
                            <label >Province</label>
                            <input type="text" name="province" value={profileData?.province} className='px-1' onChange={hdlOnChange} />
                            <label >Postal</label>
                            <input type="text" name="postal" value={profileData?.postal} className='px-1' onChange={hdlOnChange} />
                        </div>
                    </form>
                )}

            </div>
            {/* PAYMENT */}
            <div>
                <button className='bg-[#D9D9D9] w-full font-semibold text-xl  hover:bg-yellow-300' onClick={togglePay}>Payment</button>
                {isOpenPay && (
                    <div className='w-full flex flex-row p-3 bg-[#F5F5F5]'>
                        {/* LEFT */}
                        <div className='w-1/3 flex flex-col  gap-3'>
                            {bankData?.map((item, index) => {
                                return <div key={index} onClick={() => hdlSelectBank(index)}>{item.bankAccount}</div>
                            })}
                        </div>
                        {/* RIGHT */}
                        <div className='w-2/3 flex flex-row '>

                            {/* QR */}
                            <div className='w-1/2 p-5'>
                                <div>
                                    <img src={bankData[selectBank]?.pictureQr} alt="QRpic" className='w-full' />
                                </div>
                            </div>
                            {/* BANK DETAIL */}
                            <div className='w-1/2 flex flex-col gap-3'>
                                <div>{bankData[selectBank]?.bankAccount}</div>
                                <div>ACC name: mike junior</div>
                                <div>ACC number: {bankData[selectBank]?.bankAccountNumber}</div>
                            </div>
                        </div>
                    </div>
                )}
                {/* UPLOAD SLIP */}
                <div>
                    <button className='bg-[#D9D9D9] w-full font-semibold text-xl  hover:bg-yellow-300' onClick={toggleSlip}>Upload Slip</button>
                    {isOpenSlip && (
                        <div className='w-full flex flex-row p-3 bg-[#F5F5F5]'>
                            {/* LEFT */}
                            <div className='flex flex-col gap-5 items-center w-1/2'>
                                <div className='w-60 h-60'>
                                    {slipPic && <img src={URL.createObjectURL(slipPic)} className='w-full' />}
                                </div>
                                <input type="file" className="file-input file-input-bordered w-full max-w-xs" onChange={hdlUploadSlip} />
                            </div>
                            {/* RIGHT */}
                            <div className='w-1/2 lg:text-base font-bold'>
                                If you have any problems about payment or order, please contact us as soon as possible.
                            </div>
                        </div>
                    )}
                </div>
            </div>
            <button className='my-10 bg-[#D9D9D9] text-xl font-semibold text-white py-2 px-5 rounded-xl hover:bg-yellow-300 hover:text-blue-500' onClick={hdlConfirmPayment}>Confirm payment</button>
        </div>
    )
}

export default PaymentSheet