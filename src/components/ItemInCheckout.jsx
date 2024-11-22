import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { searchText } from '../api/search'

function ItemInCheckout(props) {
    const { index, name, price, quantity, url } = props

    return (
        <div className='flex flex-row justify-between'>
            <div className='flex flex-row gap-20'>
                <div>{index + 1}.</div>
                <div className=''>
                    <img src={url} alt="" className='w-full' />
                </div>
                <div>{name}</div>
            </div>
            <div className='flex flex-row justify-between w-1/2'>
                {/* Control amount */}
                <div className='flex flex-row gap-5'>
                    <div>quantity:</div>
                    {(quantity)
                        ? <div>{quantity}</div>
                        : <div>1</div>
                    }
                    <div>pieces</div>
                </div>
                {/* PRICE */}
                <div className=''>{price} baht</div>
            </div>
        </div>
    )
}

export default ItemInCheckout