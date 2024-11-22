import { create } from "zustand";
import axios from "axios";
import { persist } from "zustand/middleware";

const cartStore = create((set, get) => ({
    myCart: [],

    addCartByProductIdFn: (objCart) => {

        const currentCart = get().myCart;
        set({ myCart: [...currentCart, objCart] });
    },

    addCartByButton: (id) => {

        const currentCart = get().myCart;

        const newObj = currentCart.find((element) => element.id == id);

        set({ myCart: [...currentCart, newObj] });
    },

    // ฟังก์ชันสำหรับลบสินค้าออกจากตะกร้าตาม id ที่กำหนด
    deleteCartByProductIdFn: (id) => {
        const currentCart = get().myCart;

        // กรองสินค้าที่มี id ตรงกับ id ที่ต้องการลบออก
        const updatedCart = currentCart.filter((item) => item.id !== id);

        // อัปเดต myCart ด้วยสินค้าที่เหลือ
        set({ myCart: updatedCart });
    },

    deleteCartByButton: (id) => {

        const currentCart = get().myCart;

        // หา index ของสินค้าที่มี id ตรงกับ id ที่ต้องการลบ
        const itemIndex = currentCart.findIndex((item) => item.id === id);

        if (itemIndex !== -1) {
            const updatedCart = [...currentCart]; // ทำการ clone array
            updatedCart.splice(itemIndex, 1); // ลบสินค้าออกแค่อันเดียว

            console.log("updatedCart", updatedCart);
            console.log("removedItem", currentCart[itemIndex]);

            // อัปเดต myCart ด้วยสินค้าที่เหลือ
            set({ myCart: updatedCart });
        }
    },

    addCartWithQuantity: [],
    setAddCartWithQuantity: (newCart) => {
        set({ addCartWithQuantity: newCart })
    },

    clearCart: () => {
        set({ myCart: [] });
    },

}));

export default cartStore;
