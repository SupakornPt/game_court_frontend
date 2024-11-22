import React from 'react'
import { useNavigate } from 'react-router-dom'
import cartStore from '../store/cartStore'
import checkoutStore from '../store/checkoutStore'

function ProductDetail(props) {
    const { detailProduct } = props
    const { id, name, player_max, player_min, price, time, detail, productCategory, productImage, stock } = detailProduct
    const { name: nameCategory } = productCategory
    const { url } = productImage[0]
    const changeIsQuickBuy = checkoutStore(state =>
        state.changeIsQuickBuy
    )
    const storeQuickBuyData = checkoutStore(state =>
        state.storeQuickBuyData
    )
    const navigate = useNavigate()
    const addCartStore = cartStore(state =>
        state.addCartByProductIdFn
    )
    const quickBuy = () => {
        let data = { id, name, price }
        const quickBuyData = [{ id, name, price, quantity: 1 }]
        storeQuickBuyData(quickBuyData)
        changeIsQuickBuy(true)
        navigate("/user/checkout")
    }
    const addCart = () => {
        let data = { id, name, price }
        addCartStore(data)

    }
    const hdlBack = () => {
        navigate("/user")
    }
    console.log("urlindetail", detailProduct)
    return (
        <div className='w-full flex flex-row font-poppins text-menu'>
            {/* LEFT SIDE */}
            <div className='w-1/2 flex flex-col items-center '>
                {/* FRAME PIC */}
                <div className='w-[400px] p-5 h-[400px]'>
                    <img src={url} alt="productPicture" className='w-full' />
                </div>
            </div>
            {/* RIGHT SIDE */}
            <div className='w-1/2 flex flex-col lg:p-10 lg:gap-5 lg:h-[389px] justify-between'>
                {/* NAME+BUTTON */}
                <div className='flex flex-row justify-between'>
                    <div className='text-menu lg:text-5xl'>{name}</div>
                    {(stock === 0)
                        ? <div>
                            <div>Sold out</div>
                            <button className='bg-slate-200 lg:w-[150px] lg:rounded-xl' onClick={hdlBack}>BACK</button>
                        </div>
                        : <div className='flex flex-col text-menu lg:text-lg lg:gap-2'>
                            <button className='bg-slate-200 lg:w-[150px] lg:rounded-xl' onClick={addCart}>ADD</button>
                            <button className='bg-slate-200 lg:w-[150px] lg:rounded-xl' onClick={quickBuy}>QUICK BUY</button>
                            <button className='bg-slate-200 lg:w-[150px] lg:rounded-xl' onClick={hdlBack}>BACK</button>
                        </div>
                    }

                </div>
                {/* CATEGORY+PLAYER+TIME */}
                <div className='flex flex-col justify-start text-menu lg:text-xl'>
                    <div>{nameCategory}</div>
                    <div>{player_min} to {player_max} player</div>
                    <div>~ {time} mins</div>
                </div>
                {/* PRICE */}
                <div className='flex flex-row items-center lg:gap-3'>
                    <div className='lg:text-xl text-menu'>price:</div>
                    <div className='lg:text-2xl font-bold'>{price} baht</div>
                </div>
                {/* DETAILS */}
                <div className='flex lg:text-sm '>
                    {detail}
                </div>
            </div>
        </div>

    )
}

export default ProductDetail