import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import authStore from '../../store/authStore'
import Swal from 'sweetalert2'

function Login() {
    const loginAdmin = authStore(state => state.loginAdmin)
    const navigate = useNavigate()
    const [form, setForm] = useState({
        email: "",
        password: "",
    })

    const hdlOnChange = (e) => {
        setForm({
            ...form,
            [e.target.name]: e.target.value
        })
    }

    console.log("form", form)
    const hdlSubmit = async (e) => {
        e.preventDefault()
        try {
            const res = await loginAdmin(form)
            setForm({
                email: "",
                password: "",
            })
            navigate("/admin")
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
        <div className='bg-[#999999] h-screen flex flex-col items-center justify-center gap-10'>
            <div className='text-white font-bold font-fredoka text-8xl'>Game Court</div>
            <div className='bg-[#B6B6B6] rounded-[10px] flex flex-col p-8 gap-3 items-center'>
                <div className='flex flex-col'>
                    <label htmlFor="" className='text-white font-medium font-poppins ml-2'>Email</label>
                    <input type="text" onChange={hdlOnChange} value={form.email} name="email" className='rounded-[20px] px-3' />
                </div>
                <div className='flex flex-col'>
                    <label htmlFor="" className='text-white font-medium font-poppins ml-2'>Password</label>
                    <input type="text" onChange={hdlOnChange} value={form.password} name="password" className='rounded-[20px] mb-6 px-3' />
                </div>
                <button className='font-menu bg-white rounded-[20px] w-1/2' onClick={hdlSubmit}>Login</button>
            </div>
        </div>
    )
}

export default Login