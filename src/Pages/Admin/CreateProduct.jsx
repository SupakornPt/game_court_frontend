import React, { useEffect, useState } from 'react'
import UploadFile from '../../components/UploadFile'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'
import Swal from 'sweetalert2'
import authStore from '../../store/authStore'

function ProductManage() {
    const token = authStore((state) => state.token)
    const navigate = useNavigate()
    const [search, setSearch] = useState("")
    const [listProduct, setListProduct] = useState([])
    const [loading, setLoading] = useState(false)
    const [url, setUrl] = useState("")
    const [dataProduct, setDataProduct] = useState({
        name: "",
        productCategoryId: "",
        player_min: 0,
        player_max: 0,
        time: 0,
        stock: 0,
        detail: "",
        price: 0,
        imageUrl: "",
        public_id: "",
    })

    const getAllProduct = async () => {
        try {
            const res = await axios.get("http://localhost:8888/getall")
            setListProduct(res.data)
        } catch (err) {
            console.log(err)
        }
    }

    useEffect(() => {
        getAllProduct()
    }, [])

    const hdlonChange = (e) => {
        // console.log(e.target.name, e.target.value)
        setDataProduct({
            ...dataProduct,
            [e.target.name]: e.target.value
        })
    }

    const hdlSubmit = async (token, e) => {
        e.preventDefault()
        const newData = {
            ...dataProduct,
            imageUrl: url
        }
        const result = await axios.post("http://localhost:8888/mngproduct", newData, {
            headers: { Authorization: `Bearer' ${token}` }
        })
        Swal.fire({
            title: result.data.message,
            icon: 'success',
            confirmButtonText: 'OK'
        })
    }

    const hdlDelete = (public_id) => {
        setLoading(true)
        // const img = values.images
        const { imageUrl } = dataProduct;
        axios
            .post(
                "http://localhost:8888/removeimages",
                { public_id },
            )
            .then((res) => {
                setLoading(false)
                setDataProduct({ ...dataProduct, imageUrl: res.data });
            })
            .catch((err) => {
                //err
                setLoading(false)
                console.log(err);
            });
    };

    console.log("url createproduct", typeof url)
    const hdlEdit = () => {
        navigate("/admin")
    }
    console.log("product......", dataProduct)
    return (
        <div className='w-screen flex flex-row h-[calc(100vh-100px)] font-poppins bg-[#999999]'>
            {/* Left */}
            < div className='w-1/2 p-5 flex flex-col gap-6'>
                <div className='text-2xl text-white flex flex-col justify-between'>Product picture
                    {/* <span><button className='bg-[#686868] px-1'>Add image</button></span> */}
                    <span><button className='bg-[#686868] px-1'><UploadFile dataProduct={dataProduct} setDataProduct={setDataProduct} setUrl={setUrl} /></button></span>
                </div>
                <div className='w-full h-2/3 bg-[#D9D9D9] flex flew-row '>
                    {(url !== "")
                        ? <div>
                            <button onClick={() => hdlDelete(dataProduct.public_id)} className='text-white absolute text-2xl font-bold ml-3'>x</button>
                            <img src={url} alt="" className='w-24 h-24' />
                        </div>
                        : <div></div>}
                </div>
                <div className='text-xl flex flex-col gap-7 text-white'>
                    <div className='flex flex-row gap-5'><label htmlFor="">Name</label><input value={dataProduct.name} name='name' onChange={hdlonChange} type="text" className='w-full text-black px-3' /></div>
                    <div className='flex flex-row gap-5'><label htmlFor="">ProductCategoryId</label><input value={dataProduct?.productCategoryId || ""} name='productCategoryId' onChange={hdlonChange} type="text" className='w-full text-black px-3' /></div>
                    <div className='flex flex-row gap-5'><label htmlFor="">Player min</label><input value={dataProduct.player_min} name='player_min' onChange={hdlonChange} type="number" className='w-full text-black px-3' /></div>
                    <div className='flex flex-row gap-5'><label htmlFor="">Player max</label><input value={dataProduct.player_max} name='player_max' onChange={hdlonChange} type="number" className='w-full text-black px-3' /></div>
                    <div className='flex flex-row gap-5'><label htmlFor="">Time</label><input value={dataProduct.time} name='time' onChange={hdlonChange} type="number" className='w-full text-black px-3' /></div>
                    <div className='flex flex-row gap-5'><label htmlFor="">Price</label><input value={dataProduct.price} name='price' onChange={hdlonChange} type="number" className='w-full text-black px-3' /></div>
                </div>
            </div>
            {/* RIGHT */}
            <div className='w-1/2  p-5 flex flex-col gap-5'>
                <div className='text-2xl text-white'>Description</div>
                <textarea value={dataProduct.detail} name="detail" id="" className='p-5 resize-none w-full h-2/3 bg-[#D9D9D9] flex flex-wrap' onChange={hdlonChange} ></textarea>
                <div className='flex flex-row gap-5 text-xl text-white'><label htmlFor="">Stock</label><input value={dataProduct.stock} name='stock' onChange={hdlonChange} type="text" className='w-full text-black px-3' /></div>
                <div className='text-xl flex flex-wrap   gap-3 text-white items-center '>
                    <button onClick={(e) => hdlSubmit(token, e)} className='bg-[#686868] w-2/5'>Add</button>
                    <button onClick={hdlEdit} className='bg-[#686868] w-2/5'>Back to edit page</button>
                </div>
            </div>
        </div >
    )
}

export default ProductManage
