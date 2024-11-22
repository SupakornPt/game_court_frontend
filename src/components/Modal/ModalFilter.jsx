import React, { Children, useState } from 'react'
import productStore from '../../store/productStore'

function ModalFilter() {
    const searchFilterFn = productStore(state => state.searchFilterFn)
    const [checked, setChecked] = useState({
        "All": false,
        "Abstract": false,
        "Children": false,
        "Family": false,
        "Party": false,
        "Strategy": false,
        "Thematic": false,
        "War": false,
    })
    const [dataFilter, setDataFilter] = useState({
        playerMin: 0,
        playerMax: 0,
        playTime: 0,
        price: 0,
        productCategory: [],
    })

    const hdlOnChange = (e) => {
        console.log(e)
        console.log(e.target.value)
        setDataFilter({
            ...dataFilter,
            [e.target.name]: e.target.value
        })
    }

    const hdlOnCheck = (e) => {
        let inCheck = e.target.value
        let inState = [...dataFilter.productCategory]
        let findCheck = inState.indexOf(inCheck)
        console.log('inCheck', inCheck)
        console.log('inState', inState)
        console.log('findCheck', findCheck)

        const newChecked = { ...checked }
        newChecked[e.target.name] = !newChecked[e.target.name]
        if (newChecked.All) {
            newChecked.All = false
        }




        if (findCheck === -1) {
            inState.push(inCheck)
            if (dataFilter.productCategory.length === 6) {
                newChecked.All = true
            }
        } else {
            inState.splice(findCheck, 1)
        }
        setDataFilter((prev) => ({
            ...prev,
            productCategory: inState
        }))

        setChecked(newChecked)
        console.log(dataFilter)
        // console.log(selectCategoryId)
        console.log(inState)
    }
    const checkAll = () => {
        if (checked.All) {
            setChecked({
                ...checked,
                "All": false,
                "Abstract": false,
                "Children": false,
                "Family": false,
                "Party": false,
                "Strategy": false,
                "Thematic": false,
                "War": false,
            })
            setDataFilter({
                ...dataFilter,
                productCategory: []
            })
            return
        }
        setChecked({
            ...checked,
            "All": true,
            "Abstract": true,
            "Children": true,
            "Family": true,
            "Party": true,
            "Strategy": true,
            "Thematic": true,
            "War": true,
        })
        setDataFilter({
            ...dataFilter,
            productCategory: ["1", "2", "3", "4", "5", "6", "7"]
        })
    }
    const hdlsubmit = async (e) => {
        e.preventDefault()
        console.log("submit", dataFilter)
        const resp = await searchFilterFn(dataFilter)
    }

    return (
        <div>
            <img src="https://res.cloudinary.com/dxfryzi0g/image/upload/v1728452722/Main%20nav%20and%20Footer/filter.png"
                alt="filter" className='w-full'
                onClick={() => document.getElementById('my_modal_filter').showModal()} />

            <dialog id="my_modal_filter" className="modal">
                <div className="modal-box flex flex-col gap-5 font-poppins">
                    <div className='text-2xl font-bold text-center border-2' >FILTER</div>
                    <div className='flex flex-col gap-1 border-2 p-2'>
                        <div className='text-xl font-semibold'>Amount player</div>
                        <div className='flex flex-row'><span>Min<input type="text" value={dataFilter.playerMin} name="playerMin" onChange={hdlOnChange} className='border px-1' /></span>
                            <span>Max<input type="text" name="playerMax" className='border px-1' value={dataFilter.playerMax} onChange={hdlOnChange} /></span></div>
                        <div className='text-xl font-semibold'>Play time</div>
                        <span className='flex flex-row gap-2'>Less than<input type="text" value={dataFilter.playTime} name="playTime" className='border px-1' onChange={hdlOnChange} />minutes</span>
                        <div className='text-xl font-semibold'>Price</div>
                        <span className='flex flex-row gap-2'>Less than<input type="text" value={dataFilter.price} name="price" className='border px-1' onChange={hdlOnChange} />baht</span>
                        <div className='text-xl font-semibold'>Category</div>
                        <div className='flex flex-col gap-1 border p-3'>
                            <div className='flex flex-row gap-2'><span><input type="checkbox" name="All" value={0} checked={checked.All} onChange={checkAll} /></span>All</div>
                            <div className='flex flex-row gap-2'><span><input type="checkbox" name="Abstract" value={1} checked={checked.Abstract} onChange={hdlOnCheck} /></span>Abstract</div>
                            <div className='flex flex-row gap-2'><span><input type="checkbox" name="Children" value={2} checked={checked.Children} onChange={hdlOnCheck} /></span>Children</div>
                            <div className='flex flex-row gap-2'><span><input type="checkbox" name="Family" value={3} checked={checked.Family} onChange={hdlOnCheck} /></span>Family</div>
                            <div className='flex flex-row gap-2'><span><input type="checkbox" name="Party" value={4} checked={checked.Party} onChange={hdlOnCheck} /></span>Party</div>
                            <div className='flex flex-row gap-2'><span><input type="checkbox" name="Strategy" value={5} checked={checked.Strategy} onChange={hdlOnCheck} /></span>Strategy</div>
                            <div className='flex flex-row gap-2'><span><input type="checkbox" name="Thematic" value={6} checked={checked.Thematic} onChange={hdlOnCheck} /></span>Thematic</div>
                            <div className='flex flex-row gap-2'><span><input type="checkbox" name="War" value={7} checked={checked.War} onChange={hdlOnCheck} /></span>War</div>
                        </div>
                    </div>
                    <div className="modal-action flex flex-row justify-between">
                        <form method="dialog">
                            {/* if there is a button in form, it will start filter the modal */}
                            <button className="btn" onClick={hdlsubmit}>Search</button>
                        </form>
                        <form method="dialog">
                            {/* if there is a button in form, it will close the modal */}
                            <button className="btn">Close</button>
                        </form>
                    </div>
                </div>
            </dialog>
        </div>
    )
}

export default ModalFilter