import React, { useState } from 'react'
import Resize from "react-image-file-resizer";
import axios from 'axios';

function UploadFile(props) {
    const { dataProduct, setDataProduct, setUrl } = props


    console.log("setUjeeeeejrl", props)

    const [loading, setLoading] = useState(false)
    const hdlChangeFile = async (e) => {
        try {


            const files = e.target.files[0];
            if (files) {
                setLoading(true);
                // let allfileUpload = dataProduct.productImage
                // for (let i = 0; i < files.length; i++) {
                // Resize.imageFileResizer(
                //     files[0],
                //     720,
                //     720,
                //     "JPEG",
                //     100,
                //     0,
                //     (uri) => {
                //         axios
                //             .post("http://localhost:8888/images",
                //                 {
                //                     image: uri,

                //                 }, {
                //                 maxContentLength: 50000,
                //                 maxBodyLength: 50000
                //             },
                //             )
                //             .then((res) => {
                //                 setLoading(false);
                //                 // console.log("all", allfileUpload)
                //                 console.log("res.data", res.data)
                //                 // allfileUpload.push(res.data);
                //                 // console.log("allfileupload in then", allfileUpload);
                //                 setDataProduct({ ...dataProduct, imageUrl: res.data.url, public_id: res.data.public_id });
                //             })
                //             .catch((err) => {
                //                 setLoading(false);
                //                 console.log(err);
                //             });
                //     },
                //     "base64"
                // );
                const formData = new FormData()

                formData.append("image", files)

                const imageData = await axios.post('http://localhost:8888/images', formData)
                console.log("imageData", imageData.data.url)
                setUrl(imageData?.data?.url)

                // }
            }
        } catch (error) {
            console.log(error)
        }
    };

    return (
        <div>
            <input type="file" onChange={hdlChangeFile} accept="images/*" className='w-full' />
        </div >
    )
}

export default UploadFile