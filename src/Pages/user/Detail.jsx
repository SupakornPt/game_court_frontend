import React, { useEffect, useState } from 'react'
import ProductDetail from '../../components/ProductDetail'
import { useParams } from 'react-router-dom'
import axios from 'axios'

function Detail() {
    const [dataDetail, setDataDetail] = useState(null)

    const params = useParams()
    const fethDetail = async () => {
        const resp = await axios.get(`http://localhost:8888/productdetail/${params.id}`)
        console.log(resp)
        setDataDetail(resp.data)
    }
    useEffect(() => {
        fethDetail()
    }, [])


    return (
        <div>
            {dataDetail && <ProductDetail detailProduct={dataDetail} />}
        </div>
    )
}

export default Detail