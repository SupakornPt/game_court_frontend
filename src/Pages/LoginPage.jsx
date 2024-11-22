import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { login } from '../api/auth'
import Swal from 'sweetalert2'
import authStore from '../store/authStore'

function LoginPage() {
    const login = authStore(state => state.login)
    const navigate = useNavigate()
    const [form, setForm] = useState({
        email: "",
        password: ""
    })

    const hdlOnChange = (e) => {
        console.log(e.target.value)
        setForm({
            ...form,
            [e.target.name]: e.target.value
        })
    }
    const hdlSubmit = async (e) => {
        e.preventDefault()
        console.log(form)
        try {
            const res = await login(form)
            console.log(res)
            setForm({
                email: "",
                password: ""
            })
            navigate("/user")

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
        <div className='h-screen'>
            {/* HEADER */}
            <div className='h-1/6 flex flex-col'>
                <div className='w-[100px] lg:w-[80px] ml-[100px] mt-[50px] lg:mt-[21px]'>
                    <img src="src/picture/gamecourtLogo.png" alt="LogoPic" className='w-full' />
                </div>
            </div>
            {/* CONTENT */}
            <div className='h-4/6 flex flex-col justify-center items-center lg:mt-[20px]'>
                {/* FRAME */}
                <div className='w-1/3 bg-blue-600 p-12 lg:p-8 rounded-[20px]'>
                    {/* INPUT */}
                    <div className='flex flex-col text-white text-5xl lg:text-xl gap-1 w-full mb-[75px] lg:mb-[50px]'>
                        {/* USERNAME */}
                        <label className='ml-[20px]'>Email</label>
                        <input value={form.email} name="email" onChange={hdlOnChange} type="text" className='rounded-[50px] mb-5 lg:mb-0 px-5 text-black' />
                        {/* PASSWORD */}
                        <label className='ml-[20px]'>Password</label>
                        <input value={form.password} name='password' onChange={hdlOnChange} type="text" className='rounded-[50px] mb-5 lg:mb-0 px-5 text-black' />
                    </div>
                    {/* BUTTON+TEXT */}
                    <div className='flex flex-col justify-center gap-3 items-center'>
                        <button onClick={hdlSubmit} className='text-5xl lg:text-2xl border bg-white text-blue-500 rounded-[30px] p-2 lg:p-1 w-[300px] lg:w-[150px]'>Sign in</button>
                        <div className='text-white font-poppins text-2xl lg:text-xl'>Do you have an account? <span className='underline'><Link to="/register">Register</Link></span></div>
                    </div>
                </div>
            </div>
            {/* FOOTER */}
            <div className='h-1/6'></div>

        </div>
    )
}

export default LoginPage