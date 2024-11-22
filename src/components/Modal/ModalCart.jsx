import React, { useEffect, useState } from 'react'
import ItemInCart from '../ItemInCart'
import { useNavigate } from 'react-router-dom'
import cartStore from '../../store/cartStore'
import checkoutStore from '../../store/checkoutStore'


function ModalCart(props) {
    const changeIsQuickBuy = checkoutStore(state =>
        state.changeIsQuickBuy
    )
    const setAddCartWithQuantity = cartStore(state =>
        state.setAddCartWithQuantity);
    const [totalPrice, setTotalPrice] = useState(0)

    const { myCart } = props

    const navigate = useNavigate()

    useEffect(() => {
        const total = myCart.reduce((sum, item) => sum + item.price, 0)
        setTotalPrice(total)
    }, [myCart])




    const addCartWithQuantity = myCart.reduce((acc, item) => {
        // ตรวจสอบว่ามีสินค้าใน acc ที่มี id ซ้ำกันหรือไม่
        const foundItem = acc.find(cartItem => cartItem.id === item.id);

        if (foundItem) {
            // ถ้าพบ id ซ้ำ ให้เพิ่มจำนวนและบวกราคา
            foundItem.quantity += 1; // หรือใช้ item.quantity ถ้ามี field นี้อยู่แล้ว
            foundItem.price += item.price;
        } else {
            // ถ้าไม่มี ให้เพิ่ม item เข้าไปพร้อมตั้งค่า quantity เป็น 1
            acc.push({ ...item, quantity: 1 });
        }
        return acc;
    }, []);
    setAddCartWithQuantity(addCartWithQuantity);
    console.log('myCart', myCart)
    console.log('addCartWithQuantity', addCartWithQuantity)
    const hdlCheckout = (e) => {
        e.preventDefault
        changeIsQuickBuy(false)
        navigate("/user/checkout")
    }
    return (
        <div>
            {(myCart.length > 0)
                ? <img src="https://res.cloudinary.com/dxfryzi0g/image/upload/v1729065037/ostyqwqchnlunen7il0s.png"
                    alt="cart" className='w-full'
                    onClick={() => document.getElementById('my_modal_cart').showModal()} />


                : <img src="https://res.cloudinary.com/dxfryzi0g/image/upload/v1728452722/Main%20nav%20and%20Footer/cart.png"
                    alt="cart" className='w-full'
                    onClick={() => document.getElementById('my_modal_cart').showModal()} />}
            <dialog id="my_modal_cart" className="modal">
                <div className="modal-box flex flex-col gap-5">
                    <div className='text-2xl font-bold text-center border-2' >CART</div>
                    <div className='flex flex-col gap-1 border-2 p-2'>
                        <div>
                            <ul>
                                {addCartWithQuantity.map((item, index) => {

                                    return <li key={index}><ItemInCart key={index} id={item.id} index={index} item={item} quantityItem={item.quantity} /></li>
                                })
                                }
                            </ul>
                        </div>
                        <div className='flex flex-row justify-between'>
                            <div>Total</div>
                            <div className='flex flex-row gap-1'>
                                <div>{totalPrice}</div>
                                <div>baht</div>
                            </div>
                        </div>
                    </div>
                    <div className="modal-action flex flex-row justify-between">
                        <form method="dialog">
                            {/* if there is a button in form, it will start filter the modal */}
                            <button className="btn" onClick={(e) => hdlCheckout(e)}>Check out</button>
                        </form>
                        <form method="dialog">
                            {/* if there is a button in form, it will close the modal */}
                            <button className="btn">Close</button>
                        </form>
                    </div>
                </div>
            </dialog>
        </div>
    )
}

export default ModalCart