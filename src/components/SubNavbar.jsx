import React, { useState } from 'react'
import { searchText } from '../api/search'
import productStore from '../store/productStore'
import ModalFilter from './Modal/ModalFilter'
import ModalCart from './Modal/ModalCart'
import cartStore from '../store/cartStore'
import Swal from 'sweetalert2'

function SubNavbar(props) {
    const searchTextFn = productStore(state => state.searchTextFn)
    const myCart = cartStore(state => state.myCart)
    const [search, setSearch] = useState('')
    function hdlSearch(e) {
        console.log(e.target.value)
        setSearch(e.target.value)
    }
    console.log(search)
    const handleKeyPress = async (e) => {
        try {
            if (e.key === 'Enter') {
                const res = await searchTextFn(search)

            }
        } catch (err) {
            console.log(err)
            Swal.fire({
                title: err,
                text: 'Do you want to continue',
                icon: 'error',
                confirmButtonText: 'OK'
            })
        }
    };


    return (
        <>
            <div className='flex flex-row justify-between items-center h-[60px] lg:h-[40px] '>
                <div className='text-2xl lg:text-lg font-poppins font-semibold ml-[100px] text-menu'>Games</div>
                <div className='flex flex-row items-center mr-[100px] gap-6 lg:gap-4'>
                    <div>
                        <input type="text" className="text-lg lg:text-base h-8 lg:h-6 w-96 lg:w-48 pr-8 pl-5 rounded-[30px] z-0 focus:shadow focus:outline-none border border-[#686868]" placeholder="Search..."
                            onChange={hdlSearch} onKeyDown={handleKeyPress}
                        />
                    </div>
                    <div className='w-[30px] lg:w-[20px] h-[30px] lg:h-[20px]'>
                        {/* Modal filter */}
                        <ModalFilter />
                    </div>
                    <div className='flex flex-row items-center'>
                        <div className='w-[45px] lg:w-[30px] h-[45px] lg:h-[30px]'>
                            {/* Modal cart */}
                            <ModalCart myCart={myCart} />
                        </div>

                        {(myCart.length > 0)
                            ? <div className='bg-yellow-300 text-blue-500 font-bold p-2 rounded-full w-6 h-6 flex justify-center items-center'>{myCart.length}</div>
                            : <div>{myCart.length}</div>}

                    </div>
                </div>
            </div>
            <div className='border-b-2 lg:border-b-1 border-gray-300 w-11/12 mx-auto'></div>
        </>
    )
}

export default SubNavbar