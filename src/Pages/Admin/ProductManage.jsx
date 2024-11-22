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
    const [selectData, setSelectData] = useState([])
    const [listProduct, setListProduct] = useState([])
    const [loading, setLoading] = useState(false)
    const [dataProduct, setDataProduct] = useState({
        id: "",
        name: "",
        productCategoryId: "",
        player_min: 0,
        player_max: 0,
        time: 0,
        stock: 0,
        detail: "",
        price: 0,
        imageUrl: [],
    })
    const [editImage, setEditImage] = useState(null)
    const [url, setUrl] = useState("")
    const getAllProduct = async () => {
        try {
            const res = await axios.get("http://localhost:8888/getall")
            setListProduct(res.data)
            setSelectData(res.data)
        } catch (err) {
            console.log(err)
        }
    }

    console.log("listproduct", listProduct)

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

    const hdlSubmit = async (e) => {
        navigate("/admin/create")
    }

    const hdlOnInput = (e) => {
        setSearch(e.target.value)
    }

    const handleKeyPress = async (e) => {
        try {
            const id = search
            if (e.key === 'Enter' && id !== "") {
                const searchData = await axios.get(`http://localhost:8888/searchbyproductid/${id}`)
                console.log("kkkkk", searchData)
                setSelectData([searchData.data])
            } else if (e.key === 'Enter' && id === "") {
                console.log("check")
                setSelectData(listProduct)
            }
        } catch (err) {
            console.log(err)
        }
    }
    console.log("selectData", selectData)

    const hdlSelect = (data) => {
        console.log("data", data)
        setDataProduct({
            id: data.id,
            name: data.name,
            productCategoryId: data.productCategoryId,
            player_min: data.player_max,
            player_max: data.player_min,
            time: data.time,
            stock: data.stock,
            detail: data.detail,
            price: data.price,
            imageUrl: data?.productImage[0]?.url,
        })
        setUrl(data?.productImage[0]?.url)
    }
    console.log("datapro................", url)
    const hdlEdit = async (token, dataProduct,) => {
        try {

            const newData = {
                ...dataProduct,
                imageUrl: [url]
            }
            console.log("newData", newData)
            const id = dataProduct.id
            console.log(id)
            const dataEdit = await axios.put(`http://localhost:8888/mngeditproduct/${id}`, newData, {
                headers: { Authorization: `Bearer' ${token}` }
            })
            Swal.fire({
                title: "Edit done",
                icon: 'success',
                confirmButtonText: 'OK'
            })
            console.log(dataEdit)
        } catch (err) {
            console(err)
        }
    }

    const hdlDeleteProduct = async (token, dataProduct) => {
        try {
            const id = dataProduct.id
            const dataDelete = await axios.delete(`http://localhost:8888/mngdeleteproduct/${id}`, {
                headers: { Authorization: `Bearer' ${token}` }
            })
            Swal.fire({
                title: "Delete done",
                icon: 'success',
                confirmButtonText: 'OK'
            })
            getAllProduct()
        } catch (err) {
            console(err)
        }
    }
    console.log('url', url)
    return (
        <div className='w-screen flex flex-row h-[calc(100vh-100px)] font-poppins bg-[#999999]'>
            {/* LEFT */}
            <div className='p-5 w-1/3 flex flex-col items-center'>
                <div className='flex flex-col bg-[#D9D9D9] w-5/6'>
                    <input type="text" name="" id="" placeholder='Search...' className='text-2xl px-3' value={search} onChange={hdlOnInput} onKeyDown={handleKeyPress} />
                    <div className='text-2xl text-menu text-center mt-2'>Product list</div>
                    <div className=' text-2xl flex flex-col items-center h-[600px] overflow-y-scroll p-3 '>
                        {selectData?.map((item, index) => {
                            return <button key={index} onClick={() => hdlSelect(item)} className={`p-2 m-1 w-full ${index % 2 === 0 ? 'bg-gray-600' : 'bg-gray-400'} text-white`} >{item.id}</button>
                        })}
                    </div>
                </div>
            </div>
            {/* MID */}
            < div className='w-1/3 p-5 flex flex-col gap-6'>
                <div className='text-2xl text-white flex flex-col justify-between'>Product picture
                    {/* <span><button className='bg-[#686868] px-1'>Add image</button></span> */}
                    <span><button className='bg-[#686868] px-1'><UploadFile dataProduct={dataProduct} setDataProduct={setDataProduct} setUrl={setUrl} /></button></span>
                </div>
                <div className='w-full h-2/3 bg-[#D9D9D9] flex flew-row '>
                    {(url)
                        ? <div>
                            <div><img src={url} alt="" /></div>
                        </div>
                        : <div>No image</div>
                    }
                </div>
                <div className='text-xl flex flex-col gap-7 text-white'>
                    <div className='flex flex-row gap-5'><label htmlFor="">Name</label><input value={dataProduct.name} name='name' onChange={hdlonChange} type="text" className='w-full text-black px-3' /></div>
                    {/* SELECT CATEGORY */}
                    <select value={dataProduct.productCategoryId || ""} name='productCategoryId' onChange={hdlonChange} className="select select-bordered w-full text-menu">
                        <option disabled value="" >selectCategory</option>
                        <option value={1}>Id:1 , Abstract</option>
                        <option value={2}>Id:2 , Children</option>
                        <option value={3}>Id:3 , Family</option>
                        <option value={4}>Id:4 , Party</option>
                        <option value={5}>Id:5 , Strategy</option>
                        <option value={6}>Id:6 , Thematic</option>
                        <option value={7}>Id:7 , War</option>
                    </select>
                    <div className='flex flex-row gap-5'><label htmlFor="">Player min</label><input value={dataProduct.player_min} name='player_min' onChange={hdlonChange} type="number" className='w-full text-black px-3' /></div>
                    <div className='flex flex-row gap-5'><label htmlFor="">Player max</label><input value={dataProduct.player_max} name='player_max' onChange={hdlonChange} type="number" className='w-full text-black px-3' /></div>
                    <div className='flex flex-row gap-5'><label htmlFor="">Time</label><input value={dataProduct.time} name='time' onChange={hdlonChange} type="number" className='w-full text-black px-3' /></div>
                    <div className='flex flex-row gap-5'><label htmlFor="">Price</label><input value={dataProduct.price} name='price' onChange={hdlonChange} type="number" className='w-full text-black px-3' /></div>
                </div>
            </div>
            {/* RIGHT */}
            <div className='w-1/3  p-5 flex flex-col gap-5'>
                <div className='text-2xl text-white'>Description</div>
                <textarea value={dataProduct.detail} name="detail" id="" className='p-5 resize-none w-5/6 h-2/3 bg-[#D9D9D9] flex flex-wrap' onChange={hdlonChange} ></textarea>
                <div className='flex flex-col gap-5 text-xl text-white'><label htmlFor="">Stock</label><input value={dataProduct.stock} name='stock' onChange={hdlonChange} type="text" className='w-5/6 text-black px-3' /></div>
                <div className='text-xl flex flex-wrap   gap-3 text-white items-center '>
                    <button onClick={hdlSubmit} className='bg-[#686868] w-2/5'>create</button>
                    <button onClick={() => hdlEdit(token, dataProduct, url)} className='bg-[#686868] w-2/5'>Edit</button>
                    <button onClick={() => hdlDeleteProduct(token, dataProduct)} className='bg-[#686868] w-2/5'>Delete</button>
                </div>
            </div>
        </div >
    )
}

export default ProductManage
