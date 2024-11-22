import React, { useState } from 'react'
import cartStore from '../store/cartStore'

function ItemInCart(props) {
    const { item, index, quantityItem, id } = props
    const addCartByButton = cartStore(state =>
        state.addCartByButton
    )
    const deleteCartByButton = cartStore(state =>
        state.deleteCartByButton
    )
    const deleteCartByProductIdFn = cartStore(state =>
        state.deleteCartByProductIdFn
    )


    const hdlIncrease = () => {
        addCartByButton(id)
    }
    const hdlDecrease = () => {
        deleteCartByButton(id)
    }
    const hdlDelete = () => {
        deleteCartByProductIdFn(id)
    }
    return (
        <div className='flex flex-row justify-between'>
            <div className='flex flex-row gap-1'>
                <div>{index + 1}.</div>
                <div>{item.name}</div>
            </div>
            <div className='flex flex-row gap-3'>
                <button onClick={() => hdlIncrease()}>+</button>
                <div>{quantityItem}</div>
                <button onClick={() => hdlDecrease()}>-</button>
            </div>
            <div className='flex flex-row gap-2'>
                <div>{item.price}</div>
                <div>baht</div>
                <button onClick={() => hdlDelete()}>X</button>
            </div>
        </div>
    )
}

export default ItemInCart