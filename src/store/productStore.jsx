import { create } from "zustand";
import { getProductByCategory } from "../api/productCategory";
import { searchText } from "../api/search";
import { searchFilter } from "../api/search"
import Swal from 'sweetalert2'

const productStore = create((set, get) => ({
    products: [],
    getProductByCategoryFn: async (id) => {
        const resp = await getProductByCategory(id)
        set({ products: resp.data })
    },

    searchTextFn: async (search) => {
        const resp = await searchText(search)
        console.log(resp)
        if (resp.status == 204) {
            Swal.fire({
                title: resp.statusText,
                text: 'Do you want to continue',
                icon: 'error',
                confirmButtonText: 'OK'
            })
            return
        }

        set({ products: resp.data })
    },

    searchFilterFn: async (filter) => {
        const resp = await searchFilter(filter)
        set({ products: resp.data })
        console.log(resp, "store")
        return resp
    }


}))

export default productStore