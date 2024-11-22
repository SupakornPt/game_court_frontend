import React, { useEffect, useState } from 'react'
import CardCategory from '../../components/CardCategory'
import CardProduct from '../../components/CardProduct'
import { getProductCategory } from '../../api/productCategory'
import productStore from '../../store/productStore'


const ALL_CATEGORY = {
    id: "ALL",
    name: "ALL",
    image: "https://res.cloudinary.com/dxfryzi0g/image/upload/v1728230731/all_mspk7p.png",
    imageHover: "https://res.cloudinary.com/dxfryzi0g/image/upload/v1728230731/allHover_kj4ink.png"
}

function User() {
    const products = productStore(state =>
        state.products
    )
    const [cardCategory, setCardCategory] = useState([])

    const getProductData = async () => {
        try {
            const resp = await getProductCategory()
            console.log("user resp", resp)
            setCardCategory([ALL_CATEGORY, ...resp.data?.category])
        } catch (err) {
            console.log(err)
        }
    }
    useEffect(() => {
        getProductData()
    }, [])

    console.log("User", products)



    return (
        <div className='flex flex-col mt-5 '>
            <div className='flex flex-row flex-wrap lg:gap-[1px] lg:my-[1px] justify-center'>
                {cardCategory?.map((item, index) => (
                    <CardCategory key={index} id={item.id} text={item.name} img={item.image} imgHover={item.imageHover} />
                )
                )}
            </div>
            <div className='flex flex-row flex-wrap lg:gap-[39px] mt-5 overflow-y-scroll  h-[calc(100vh-350px)]'>
                {products?.map((item, index) => (
                    <CardProduct key={index} id={item.id} name={item.name} player_min={item.player_min} player_max={item.player_max} time={item.time} price={item.price}
                        productCategory={item.productCategory} productImage={item.productImage} stock={item.stock} />
                ))}
            </div>
        </div>
    )
}

export default User