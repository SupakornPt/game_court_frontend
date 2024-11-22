import { create } from "zustand";

const checkoutStore = create((set, get) => ({
    isQuickBuy: false,
    changeIsQuickBuy: (statusQuickbuy) => {
        set({ isQuickBuy: statusQuickbuy })
    },

    setQuickBuyData: [],
    storeQuickBuyData: (quickBuyData) => {
        set({ setQuickBuyData: quickBuyData })
    }
}))

export default checkoutStore