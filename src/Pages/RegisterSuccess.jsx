import React from 'react'
import { Link } from 'react-router-dom'

function RegisterSuccess() {
    return (
        <div className='w-screen h-screen flex flex-row font-poppins'>
            {/* RIGHT */}
            <div className='w-2/3 flex flex-col items-center justify-center'>
                <div className='flex flex-col items-center justify-center   '>
                    <iframe src="https://giphy.com/embed/t3sZxY5zS5B0z5zMIz" width="960" height="480" class="giphy-embed" allowFullScreen></iframe>
                </div>
            </div>
            {/* MID */}
            <div className='w-1/3 flex flex-col text-menu items-center gap-5 justify-center'>
                <div className='text-3xl'>Register Success</div>
                <div className='text-2xl'>Please go to sign in</div>
                <div><Link to="/login" className='p-2 text-2xl bg-yellow-400'>Sign in</Link></div>
            </div>
        </div >
    )
}

export default RegisterSuccess