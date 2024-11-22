import React, { useEffect, useState } from 'react'
import { createProfile, getProfile, updateProfile } from '../api/profile'
import authStore from '../store/authStore'
import Swal from 'sweetalert2'
import axios from 'axios'

function Profile(props) {
    const token = authStore((state) => state.token)
    const dataFromAuthStore = authStore()
    const { user } = dataFromAuthStore
    const { userId, email } = user


    const [isDisabled, setIsDisabled] = useState(true)
    const hdlToggleEdit = () => {
        setIsDisabled(!isDisabled)
    }


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
    const hdlOnInput = (e) => {
        setProfileData({
            ...profileData,
            [e.target.name]: e.target.value
        })
    }

    console.log("profile", profileData)
    const getProfileFn = async () => {
        try {
            const res = await getProfile(String(userId), token)
            setProfileData({
                firstName: res.data.firstName || "",
                lastName: res.data.lastName || "",
                phone: res.data.phone || "",
                addressHome: res.data.addressHome || "",
                subDistrict: res.data.subDistrict || "",
                district: res.data.district || "",
                province: res.data.province || "",
                postal: res.data.postal || ""
            })
        } catch (err) {
            console.log(err)
            Swal.fire({
                title: "Please add your address",
                text: 'Do you want to continue',
                icon: 'info',
                confirmButtonText: 'OK'
            })
        }
    }

    useEffect(() => {
        getProfileFn()
    }, [userId])


    const hdlAdd = async (token, userId) => {
        try {
            const checkAddress = await axios.get(`http://localhost:8888/address/${userId}`, {
                headers: { Authorization: `Bearer' ${token}` }
            })
            console.log("checkAddress", checkAddress)
            if (checkAddress?.data?.address === "Address not found") {

                const resAdd = await createProfile(profileData, userId, token)
                Swal.fire({
                    title: "Create address done",
                    text: 'If you would like to change your address,pleas edit and confirm your address.',
                    icon: 'success',
                    confirmButtonText: 'OK'
                })
            } else {
                Swal.fire({
                    title: "You already have address",
                    text: 'If you would like to change your address,pleas edit and confirm your address.',
                    icon: 'info',
                    confirmButtonText: 'OK'
                })
            }
        } catch (err) {
            console.log(err)
        }


    }

    const hdlConfirm = async () => {
        try {
            const resConfirm = await updateProfile(profileData, userId, token)
            Swal.fire({
                title: "Your address already changed",
                icon: 'success',
                confirmButtonText: 'OK'
            })
        } catch (err) {
            console.log(err)
        }
    }
    return (
        <div className='text-menu font-poppins h-[calc(100vh-196px)] flex flex-col justify-evenly'>
            {/* PICTURRE */}
            <div className='flex flex-row items-center lg:p-4 lg:gap-10 lg:mb-2'>
                <div className=' h-64 w-64 lg:h-44 lg:w-44 '>
                    <img src="https://res.cloudinary.com/dxfryzi0g/image/upload/v1728451377/DB%20For%20CardCategory/apaalsllxytxe4lthfgf.png" alt="AvatarPicture" className='w-full' />
                </div>
                <div>
                    <div>
                        <input type="text" onChange={hdlOnInput} placeholder='first name' value={profileData.firstName} name="firstName" className={`${isDisabled ? "bg-white" : "bg-blue-100"} lg:text-6xl font-bold mr-1 w-96`} disabled={isDisabled} />
                        <span><input type="text" onChange={hdlOnInput} placeholder='last name' value={profileData.lastName} name="lastName" className={`${isDisabled ? "bg-white" : "bg-blue-100"} lg:text-6xl font-bold w-grow`} disabled={isDisabled} /></span>
                    </div>
                    <div className='lg:text-2xl font-light flex flex-col'>
                        <input type="text" placeholder='Email' value={email} disabled={true} className='bg-white' />
                        <input type="text" onChange={hdlOnInput} name="phone" value={profileData.phone} placeholder='Phone' disabled={isDisabled} className={`${isDisabled ? "bg-white" : "bg-blue-100"}`} />
                    </div>
                </div>
            </div>
            <div className='border-b-2'></div>
            {/* ADDRESS */}
            <div className='flex flex-row lg:h-[173px]'>
                {/* LEFT */}
                <div className=' w-1/2 flex flex-col lg:gap-1 items-center'>
                    <div className='lg:text-xl font-bold'>Address</div>
                    <input type="text" onChange={hdlOnInput} value={profileData.addressHome} name="addressHome" className={`${isDisabled ? "bg-white" : "bg-blue-100"}`} placeholder="Address" disabled={isDisabled} />
                    <input type="text" onChange={hdlOnInput} value={profileData.subDistrict} name="subDistrict" className={`${isDisabled ? "bg-white" : "bg-blue-100"}`} placeholder="Sub district" disabled={isDisabled} />
                    <input type="text" onChange={hdlOnInput} value={profileData.district} name="district" className={`${isDisabled ? "bg-white" : "bg-blue-100"}`} placeholder="District" disabled={isDisabled} />
                    <input type="text" onChange={hdlOnInput} value={profileData.province} name="province" className={`${isDisabled ? "bg-white" : "bg-blue-100"}`} placeholder="Province" disabled={isDisabled} />
                    <input type="text" onChange={hdlOnInput} value={profileData.postal} name="postal" className={`${isDisabled ? "bg-white" : "bg-blue-100"}`} placeholder="Postal" disabled={isDisabled} />
                </div>
                {/* RIGHT */}
                <div className='w-1/2 flex flex-col justify-evenly items-center'>
                    <button className='bg-slate-200 lg:w-[100px] rounded-xl hover:bg-yellow-300 hover:text-blue-500' onClick={() => hdlAdd(token, userId)}>Add</button>
                    <button className='bg-slate-200 lg:w-[100px] rounded-xl hover:bg-yellow-300 hover:text-blue-500' onClick={() => hdlToggleEdit()}>Edit</button>
                    <button className='bg-slate-200 lg:w-[100px] rounded-xl hover:bg-yellow-300 hover:text-blue-500' onClick={() => hdlConfirm()}>Confirm</button>
                </div>
            </div>

        </div>
    )
}

export default Profile


