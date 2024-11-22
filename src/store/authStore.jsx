import axios from "axios";
import { create } from "zustand";
import { persist } from "zustand/middleware";

const authStore = create(
    persist(
        (set) => ({
            user: null,
            token: "",
            login: async (input) => {
                const rs = await axios.post("http://localhost:8888/login", input);
                set({ token: rs.data.token, user: rs.data.payload });
                return rs.data.payload;
            },
            logout: () => {
                set({ token: "", user: null });
            },
            loginAdmin: async (input) => {
                const rs = await axios.post("http://localhost:8888/loginadmin", input)
                set({ token: rs.data.token, user: rs.data.payload })
                return rs.data.payload
            }
        }),
        {
            name: "auth-storage",
            partialize: (state) => ({ token: state.token, user: state.user }),
        }
    )
);

export default authStore;
