import React from 'react'
import { getProductByCategory } from '../api/productCategory'
import productStore from '../store/productStore'

function CardCategory(props) {
    const { id, text, img, imgHover } = props
    const getProductByCategoryFn = productStore(state => state.getProductByCategoryFn)

    const hdlOnClick = async (id) => {
        console.log('id', id)
        getProductByCategoryFn(id)

    }
    return (
        <div onClick={(e) => hdlOnClick(id)}>
            <button className="icon-button flex items-center group w-60 lg:w-48 border border-b-2 border-gray-300 rounded-[10px] p-2 ml-5">
                <div className='w-1/2'>
                    <div className=" w-20 lg:w-16 h-20 lg:h-16">
                        <img src={img} alt="" className="w-full h-full group-hover:hidden group-focus:hidden" />
                        <img src={imgHover} alt="" className="w-full h-full hidden group-hover:flex group-focus:hidden" />
                        <img src={imgHover} alt="" className="w-full h-full hidden group-focus:flex" />
                    </div>
                </div>
                <div className='flex flex-row w-1/2 justify-center'>
                    <div className="text-menu  font-poppins font-semibold text-2xl lg:text-xl ">{text}</div>
                </div>
            </button >

        </div >
    )
}
export default CardCategory