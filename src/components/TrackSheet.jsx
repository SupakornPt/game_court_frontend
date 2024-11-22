import React, { useEffect, useState } from 'react'
import TrackCard from './TrackCard'
import authStore from '../store/authStore'
import { getOrderAllData, searchOrderFn } from '../api/track'

function TrackSheet() {
    const token = authStore((state) => state.token)
    const dataFromAuthStore = authStore()
    const { user } = dataFromAuthStore
    const { userId, email } = user
    const [orderNumber, setOrderNumber] = useState(0)
    const [trackData, setTrackData] = useState([])

    const getOrderAllFn = async () => {
        try {
            const orderAll = await getOrderAllData(token, userId)
            setTrackData(orderAll.data)
        } catch (err) {
            console.log(err)
        }
    }

    useEffect(() => {
        getOrderAllFn()
    }, [])

    console.log("trackData", trackData)

    const hdlOnInput = (e) => {
        setOrderNumber(e.target.value)
    }

    const handleKeyPress = async (e) => {
        try {
            if (e.key === 'Enter') {
                const res = await searchOrderFn(token, orderNumber)
                setTrackData([res.data])

            }
        } catch (err) {
            console.log(err)
        }
    }

    return (
        <div className='overflow-y-scroll  h-[calc(100vh-196px)]'>
            <div className='flex flex-rows mt-5 mb-1 text-2xl font-semibold gap-3'>
                <label >Search order number</label>
                <input type="text" className='bg-yellow-200 px-1' onChange={hdlOnInput} onKeyDown={handleKeyPress} />
            </div>
            <div className='flex flex-wrap gap-1 p-4'>
                {trackData?.map((item, index) => {
                    return <div key={index}><TrackCard totalPrice={item.totalPrice} paymentData={item.payment} /></div>
                })}
            </div>
        </div>
    )
}

export default TrackSheet