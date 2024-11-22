function Footer(props) {
    return (
        <div className='flex flex-row justify-between items-center bg-slate-200'>
            <div className='font-poppins text-lg lg:text-sm ml-[100px]'>Copyright@<span className='font-bold'>Game Court</span></div>
            <div className='flex flex-row justify-evenly items-center mr-[100px] gap-10 lg:gap-5'>
                <div className='w-[33px] lg:w-[26px] h-[33px] lg:h-[26px]'>
                    <img src="https://res.cloudinary.com/dxfryzi0g/image/upload/v1728452722/Main%20nav%20and%20Footer/Facebook.png" alt="facebook" className='w-full' />
                </div>
                <div className='w-[30px] lg:w-[25px] h-[30px] lg:h-[25px] '>
                    <img src="https://res.cloudinary.com/dxfryzi0g/image/upload/v1728452722/Main%20nav%20and%20Footer/twitter.png" alt="twitter" className='w-full' />
                </div>
                <div className='w-[30px] lg:w-[25px] h-[30px] lg:h-[25px]'>
                    <img src="https://res.cloudinary.com/dxfryzi0g/image/upload/v1728452722/Main%20nav%20and%20Footer/Ig.png" alt="instagram" className='w-full' />
                </div>
                <div className='w-[50px] lg:w-[40px] h-[50px] lg:h-[40px]'>
                    <img src="https://res.cloudinary.com/dxfryzi0g/image/upload/v1728452722/Main%20nav%20and%20Footer/mail.png" alt="email" className='w-full' />
                </div>
            </div>
        </div>
    )
}

export default Footer