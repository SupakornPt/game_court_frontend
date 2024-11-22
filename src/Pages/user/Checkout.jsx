import React, { useEffect, useState } from 'react'
import CheckoutProduct from "../../components/CheckoutProduct"
import cartStore from '../../store/cartStore'
import checkoutStore from '../../store/checkoutStore';

function Checkout() {
    const [productSet, setProductSet] = useState([])
    const isQuickBuy = checkoutStore(state =>
        state.isQuickBuy
    )
    const setQuickBuyData = checkoutStore(state =>
        state.setQuickBuyData
    )
    const addCartWithQuantity = cartStore(state =>
        state.addCartWithQuantity
    )
    console.log("quickBuyData", setQuickBuyData)
    console.log("addCartWithQuantity", addCartWithQuantity)
    useEffect(() => {
        if (isQuickBuy) {
            setProductSet(setQuickBuyData)
            console.log("isQuickBuy true")
        } else {
            setProductSet(addCartWithQuantity)
            console.log("isQuickBuy false")
        }
    }, [isQuickBuy])

    console.log("Checkout-isQuickBuy", isQuickBuy)
    console.log("Checkout-productSet", productSet)
    return (
        <div>
            <CheckoutProduct productSet={productSet} />
        </div>
    )
}

export default Checkout