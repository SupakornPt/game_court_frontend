import React from 'react'
import ItemInCheckout from './ItemInCheckout'
import { useNavigate } from 'react-router-dom'
import { createOrder } from '../api/payment'
import authStore from '../store/authStore'
import Swal from 'sweetalert2'


function CheckoutProduct(props) {
    const { productSet } = props
    const token = authStore((state) => state.token)
    const totalPrice = productSet.reduce((total, item) => total += item.price, 0)
    const navigate = useNavigate()


    const hdlOnClick = async (e) => {
        e.preventDefault()
        try {
            console.log("checkout", typeof token)
            if (!token) {
                Swal.fire({
                    title: 'Please log in',
                    text: 'Do you want to continue',
                    icon: 'error',
                    showConfirmButton: false,
                    html: `<a href="/login" class="swal2-confirm swal2-styled" style="display: inline-block; padding: 10px 20px; color: white; background-color: #3085d6; border-radius: 5px; text-decoration: none;">Log in</a>`
                })
                return

            }
            const newProdArr = productSet.reduce((prev, curr) => {
                prev.push({ productId: curr.id, quantity: curr.quantity })
                return prev
            }, [])

            const data = { totalPrice, productSet: newProdArr }
            const res = await createOrder(data, token)
            navigate(`/user/payment/${res.data.newOrder.id}`)
        } catch (err) {
            console.log(err)
        }
    }
    return (
        <div className='font-poppins h-[calc(100vh-196px)] flex flex-col justify-between'>
            <div className='p-[20px]'>
                {productSet.map((item, index) => (
                    <ItemInCheckout key={index} index={index} name={item.name} price={item.price} quantity={item.quantity} url={item.url} />
                ))}
            </div>
            {/* SUMMARY BAR */}
            <div className='px-[20px] flex flex-row justify-between border-t-2 border-gray-300 text-2xl font-bold h-[60px] items-center  w-full'>
                <div>Total</div>
                <div>{totalPrice} baht</div>
                <button className='text-white bg-[#D9D9D9] px-3 py-1 hover:bg-yellow-300 hover:text-blue-500' onClick={hdlOnClick}>Buy</button>
            </div>
        </div>
    )
}

export default CheckoutProduct