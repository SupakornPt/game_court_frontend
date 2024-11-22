import React from 'react'
import ProductDetail from './ProductDetail'
import { isRouteErrorResponse, useNavigate } from 'react-router-dom'
import { getProductDetail } from '../api/productCategory'
import cartStore from '../store/cartStore'
import checkoutStore from '../store/checkoutStore'

function CardProduct(props) {
    const navigate = useNavigate()
    const addCartStore = cartStore(state =>
        state.addCartByProductIdFn
    )
    const myCart = cartStore(state =>
        state.myCart
    )
    const changeIsQuickBuy = checkoutStore(state =>
        state.changeIsQuickBuy
    )
    const storeQuickBuyData = checkoutStore(state =>
        state.storeQuickBuyData
    )
    console.log("cardproduct1", props)
    const { id, name, player_min, player_max, time, price, productCategory, productImage, stock } = props
    const { name: nameCategory } = productCategory
    const { url } = productImage[0]
    console.log("url", url)
    // console.log("CardProduct")
    const hdlOnClick = async () => {
        console.log(id)
        await getProductDetail(id)
        navigate(`/user/detail/${id}`)
    }
    const quickHdlOnClick = () => {
        const quickBuyData = [{ id, name, price, url, quantity: 1 }]
        storeQuickBuyData(quickBuyData)
        changeIsQuickBuy(true)
        navigate("/user/checkout")
    }
    const addCart = () => {
        let data = { id, name, price, url }
        addCartStore(data)

    }

    return (
        <div className='group' >
            <div className=' flex flex-col lg:p-2 lg:w-52 lg:h-[270px] group-hover:shadow-[5px_5px_0px_0px_rgba(255,255,0)] group-hover:border-yellow-300 group-hover:border'  >
                <div className='group-hover:lg:h-[205px] ' onClick={hdlOnClick}>
                    <img src={url} alt="ProductPic" className=' w-full h-[140px] group-hover:h-[160px]' />
                </div>
                <div className='text-menu font-poppins font-bold text-xl lg:text-base flex justify-between' onClick={hdlOnClick}>{name}</div>
                {(stock === 0)
                    ? <div className='bg-yellow-300 text-xl'>Sold out</div>
                    : <div>
                        <div className='text-menu font-poppins lg:text-sm group-hover:hidden flex flex-col items-start' >
                            <div>{nameCategory}</div>
                            <div>{player_min}to{player_max}</div>
                            <div>{time} mins</div>
                        </div>
                        <button className='hidden hover:bg-yellow-300 group-hover:flex lg:text-sm font-medium hover:text-blue-600' onClick={quickHdlOnClick}>QUICK BUY</button>
                        <button className='hidden hover:bg-yellow-300 group-hover:flex lg:text-sm font-medium hover:text-blue-600' onClick={addCart}>ADD</button>
                    </div>
                }
                <div className='text-menu font-poppins font-medium lg:text-lg flex items-start' onClick={hdlOnClick}>BAHT {price}</div>
            </div>
        </div>
    )
}

export default CardProduct