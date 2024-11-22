import React, { useEffect, useState } from 'react'
import axios from 'axios'
import Swal from 'sweetalert2'
import authStore from '../../store/authStore'

function TrackManage() {
    const [search, setSearch] = useState("")
    const [selectData, setSelectData] = useState([])
    const token = authStore((state) => state.token)
    const [stateTracking, setStateTracking] = useState({})
    const [getTrackingAll, setGetTrackingAll] = useState({})
    const [trackingShipment, setTrackingShipment] = useState({
        trackingId: "",
        paymentId: "",
        userId: "",
    })
    const [state, setState] = useState({})
    const [paymentData, setPaymentData] = useState({
        id: "",
        statuspayment: "",
        isPaid: false,
        slipConfirm: false,
    })
    const [orderData, setOrderData] = useState([])
    const getOrderAll = async (token) => {
        try {
            const orderDataSet = await axios.get("http://localhost:8888/getorderall", {
                headers: { Authorization: `Bearer' ${token}` }
            })
            setOrderData(orderDataSet.data)
            setSelectData(orderDataSet.data)
            console.log("token", token)
        } catch (err) {
            console.log(err)
        }
    }
    useEffect(() => {
        getOrderAll(token)
        getTrackingShipmentAll(token)

    }, [])

    const hdlOnClick = (orderId) => {
        console.log("orderId", orderId)
        setState(orderData[orderId])
        setStateTracking(getTrackingAll[orderId])
    }

    const hdlOnChange = (e) => {
        const paymentId = state?.payment?.id
        if (e.target.value === "REJECT") {
            setPaymentData({
                ...paymentData,
                [e.target.name]: e.target.value,
                id: paymentId,
                isPaid: false,
                slipConfirm: false,
            })
        } else {
            setPaymentData({
                ...paymentData,
                [e.target.name]: e.target.value,
                id: paymentId,
                isPaid: true,
                slipConfirm: true,
            })
        }
    }
    console.log("paymentData", paymentData)
    const hdlOnUpdatePayment = async (token, paymentData) => {
        try {
            const newStatus = await axios.patch("http://localhost:8888/updatepaymentstatus", paymentData, {
                headers: { Authorization: `Bearer' ${token}` }
            })
            console.log(newStatus)
            Swal.fire({
                title: newStatus.data.message,
                icon: 'success',
                confirmButtonText: 'OK'
            })

        } catch (err) {
            console.log(err)
        }
    }

    const hdlOnInputTrackingId = (e) => {
        setTrackingShipment({
            ...trackingShipment,
            [e.target.name]: e.target.value,
            paymentId: state?.payment?.id,
            userId: state?.user?.id,
        })

    }

    const handleKeyPress = async (e) => {
        try {
            const id = search
            if (e.key === 'Enter' && id !== "") {
                const searchData = await axios.get(`http://localhost:8888/searchbyproductid/${id}`)
                console.log("kkkkk", searchData)
                setSelectData([searchData.data])
            } else if (e.key === 'Enter' && id === "") {
                console.log("check")
                setSelectData(orderData)
            }
        } catch (err) {
            console.log(err)
        }
    }

    const hdlAddTrackingId = async (token, trackingShipment) => {
        try {
            if (stateTracking.trackingId !== "") {
                Swal.fire({
                    title: "Your Payment has data , please click update to change the data.",
                    icon: 'info',
                    confirmButtonText: 'OK'
                })
            } else {
                const res = await axios.post("http://localhost:8888/addtrackingid", trackingShipment, {
                    headers: { Authorization: `Bearer' ${token}` }
                })
                console.log(res)
                Swal.fire({
                    title: "Create tracking id done.",
                    icon: 'success',
                    confirmButtonText: 'OK'
                })
            }
        } catch (err) {
            console.log(err)
        }
    }

    const getTrackingShipmentAll = async (token) => {
        try {
            const res = await axios.get('http://localhost:8888/gettrackingdata', {
                headers: { Authorization: `Bearer' ${token}` }
            })
            console.log("gettrackingall", res)
            setGetTrackingAll(res.data)
        } catch (err) {
            console.log(err)
        }
    }

    const hdlEditTrackingId = async (token, trackingShipment) => {
        try {
            const { paymentId } = trackingShipment
            const res = await axios.patch(`http://localhost:8888/updatetrackingid/${paymentId}`, trackingShipment, {
                headers: { Authorization: `Bearer' ${token}` }
            })
            console.log("res", res)
            Swal.fire({
                title: "Update tracking id done.",
                icon: 'success',
                confirmButtonText: 'OK'
            })
            setStateTracking({
                ...stateTracking,
                trackingId: res.data.trackingId || trackingShipment.trackingId
            })

        } catch (err) {
            console(err)
        }
    }
    const hdlOnInput = (e) => {
        setSearch(e.target.value)
    }
    console.log("stateTracking", stateTracking)
    return (
        <div className='w-screen flex flex-row h-[calc(100vh-100px)] font-poppins bg-[#999999]'>
            {/* LEFT */}
            <div className='flex flex-col bg-[#999999] w-1/3 p-5'>
                <div className='flex flex-col bg-[#D9D9D9] w-5/6'>
                    <input type="text" name="" id="" placeholder='Search...' className='text-2xl px-3' value={search} onChange={hdlOnInput} onKeyDown={handleKeyPress} />
                    <div className='text-2xl text-menu text-center mt-2'>Order list</div>
                    <div className=' text-2xl flex flex-col items-center h-[600px] overflow-y-scroll p-3 '>
                        {selectData.map((item, index) => {
                            return <div className={`text-center p-2 m-1 w-full ${index % 2 === 0 ? 'bg-gray-600' : 'bg-gray-400'} text-white`} onClick={() => hdlOnClick(index)} key={item.id} >{item.id}</div>
                        })}
                    </div>
                </div>
            </div>
            {/* MID */}
            <div className='w-1/3 bg-[#999999] flex flex-col gap-5 p-5'>
                {/* ORDER DETAILS */}
                <div>
                    <div className='text-white text-2xl mb-2'>Order details</div>
                    <div className='flex flex-col gap-3 bg-slate-200 p-3'>
                        <div className='flex flex-col gap-1'>
                            <div>Order Id : {state?.id}</div>
                            <div>Total price : {state?.totalPrice} baht</div>
                        </div>
                        <div className='flex flex-col gap-3'>
                            <div className='text-center text-xl bg-slate-100'>product list</div>
                            <ul>
                                {state?.orderProductId?.map((item, index) => {
                                    return <div key={index} className='flex flex-row justify-between'>
                                        <div>{index + 1}.</div>
                                        <div>{item.product.name}:</div>
                                        <div>{item.quantity}</div>
                                        <div>Pc</div>
                                    </div>
                                })}
                            </ul>
                        </div>
                    </div>
                </div>
                {/* USER DETAILS */}
                <div>
                    <div className='text-white text-2xl flex flex-col mb-2'>User details</div>
                    <div className='flex flex-col bg-slate-200 p-3 gap-5'>
                        <div>User id : {state?.userId}</div>
                        <div className='bg-slate-100 text-center text-xl'>Address</div>
                        <div>
                            <div className='flex flex-row gap-3'>
                                <div>{state?.user?.address[0]?.firstName}</div>
                                <div>{state?.user?.address[0]?.lastName}</div>
                            </div>
                            <div>
                                {state?.user?.address[0]?.addressHome}/{state?.user?.address[0]?.subDistrict}/
                                {state?.user?.address[0]?.district}/{state?.user?.address[0]?.province}/{state?.user?.address[0]?.postal}/
                                {state?.user?.address[0]?.phone}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            {/* RIGHT */}
            <div className='w-1/3 bg-[#999999] flex flex-col p-5'>
                <div className='text-2xl text-white mb-2'>Slip picture</div>
                {/* FRAME IMAGE */}
                <div className='p-5 bg-slate-100'>
                    <img src={stateTracking?.payment?.slipUrl} alt="SlipPic" />
                </div>
                {/* PAYMENT AND TRACkING */}
                <div className='flex flex-col bg-slate-200 p-5 gap-5'>
                    <div className='bg-slate-100 text-xl text-center'>Payment and track</div>
                    <div>
                        <div>Update status-payment</div>
                        <select name='statuspayment' onChange={hdlOnChange} className="select select-bordered w-full mt-1">
                            <option disabled selected>{state?.payment?.statuspayment}</option>
                            <option value="WAITING_PAY">WAITING_PAY</option>
                            <option value="PENDING">PENDING</option>
                            <option value="REJECT">REJECT</option>
                            <option value="SEND">SEND</option>
                        </select>
                        <div className='text-xl flex flex-wrap gap-3 text-white items-center mt-2'>
                            <button className='bg-[#686868] w-3/5' onClick={() => hdlOnUpdatePayment(token, paymentData)} >Update</button>
                        </div>
                        <div className='mt-5'>Tracking Id : Number, that get from shipping when you already sent.</div>
                        <input type="text" className='w-full my-1 px-1' onChange={hdlOnInputTrackingId} name='trackingId' placeholder={stateTracking?.trackingId} />
                        <div className='text-xl flex flex-wrap mt-1 gap-3 text-white items-center '>

                            <button className='bg-[#686868] w-2/5' onClick={() => hdlAddTrackingId(token, trackingShipment)}>Add</button>
                            <button className='bg-[#686868] w-2/5' onClick={() => hdlEditTrackingId(token, trackingShipment)}>Update</button>

                        </div>
                    </div>
                </div>
            </div>
        </div >
    )
}

export default TrackManage