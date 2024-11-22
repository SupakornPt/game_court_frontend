import axios from 'axios'
import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { register } from '../api/auth'
import Swal from 'sweetalert2'


function RegisterPage() {
    const navigate = useNavigate()
    const [form, setForm] = useState({
        userName: "",
        email: "",
        password: "",
        conFirmPassword: ""
    })
    const hdlOnChange = (e) => {
        console.log(e.target.name)
        console.log(e.target.value)
        setForm({
            ...form,
            [e.target.name]: e.target.value
        })
    }
    const hdlsubmit = async (e) => {
        e.preventDefault()
        console.log(form)
        try {

            const res = await register(form)
            console.log(res)
            setForm({
                userName: "",
                email: "",
                password: "",
                conFirmPassword: ""
            })
            navigate("/success")

        } catch (err) {
            console.log(err.response)
            Swal.fire({
                title: err.response.data.error || err.response.data.message,
                text: 'Do you want to continue',
                icon: 'error',
                confirmButtonText: 'OK'
            })
        }

    }
    return (
        <div className='h-screen flex flex-row'>
            {/* LEFT SIDE */}
            <div className='w-1/2 flex flex-col bg-blue-50]'>
                {/* Header */}
                <div className='h-28  flex flex-row items-center'>
                    {/* LOGO */}
                    <div className='w-[100px] ml-[100px] lg:w-[80px]'>
                        <img src="src/picture/gamecourtLogo.png" alt="LogoPic" className='w-full' />
                    </div>
                </div>
                {/* TEXT */}
                <div className='h-5/6 lg:h-4/6 flex flex-col justify-around mb-4'>
                    <div className='ml-[100px] h-1/3 flex flex-col font-poppins text-5xl lg:text-3xl text-semibold justify-center gap-5 lg:gap-2'>
                        <div>connect friends</div>
                        <div>connect board games</div>
                        <div>connect fun</div>
                    </div>
                    {/* ANIMATION OR CARTOON */}
                    <div className='h-2/3 lg:h-4/5 lg:mt-[12px] flex justify-center '>
                        <img src="https://picsum.photos/800/500" alt="RegisterPic" className='' />
                    </div>
                </div>
            </div>
            {/* RIGHT SIDE */}
            <div className='w-1/2 flex justify-center px-[150px] lg:px-[80px] py-[50px] lg:py-[25px]'>
                {/* FRAME */}
                <div className='flex flex-col justify-evenly items-center w-full px-[50px] bg-blue-600 rounded-[30px] '>
                    <div className='text-5xl lg:text-3xl text-semibold font-poppins text-white'>
                        REGISTER TO CONNECT
                    </div>
                    {/* INPUT */}
                    <div className='flex flex-col justify-center text-white text-4xl lg:text-2xl gap-2 lg:gap-0 w-full'>
                        {/* USERNAME */}
                        <label htmlFor="" className='ml-[20px] text-3xl lg:text-xl'>Username</label>
                        <input value={form.userName} name='userName' type="text" className='rounded-[50px] mb-5 text-black px-5' onChange={hdlOnChange} />

                        {/* EMAIL */}
                        <label htmlFor="" className='ml-[20px] text-3xl lg:text-xl'>Email</label>
                        <input value={form.email} name="email" type="text" className='rounded-[50px] mb-5 text-black px-5' onChange={hdlOnChange} />

                        {/* PASSWORD */}
                        <label htmlFor="" className='ml-[20px] text-3xl lg:text-xl'>Password</label>
                        <input value={form.password} name="password" type="password" className='rounded-[50px] mb-5 text-black px-5' onChange={hdlOnChange} />

                        {/* CONFIRM PASSWORD */}
                        <label htmlFor="" className='ml-[20px] text-3xl lg:text-xl'>Confirm password</label>
                        <input value={form.conFirmPassword} name="conFirmPassword" type="password" className='rounded-[50px] mb-5 text-black px-5' onChange={hdlOnChange} />

                    </div>
                    {/* BUTTON+TEXT */}
                    <div className='flex flex-col justify-center gap-3 items-center'>
                        <button className='text-4xl lg:text-2xl border bg-white text-blue-500 rounded-[30px] py-1 w-[350px] lg:w-[200px]' onClick={hdlsubmit}>Create account</button>
                        <div className='text-white font-poppins text-xl'>Already have an account? <span className='underline'><Link to="/login">Sign in</Link></span></div>
                    </div>
                </div>


            </div>
        </div>
    )
}

export default RegisterPage