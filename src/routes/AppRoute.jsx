import React, { useEffect, useState } from 'react'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import LandingPage from '../Pages/LandingPage'
import RegisterPage from '../Pages/RegisterPage'
import LoginPage from '../Pages/LoginPage'
import MainNavbar from '../components/MainNavbar'
import SubNavbar from '../components/SubNavbar'
import CardCategory from '../components/CardCategory'
import Login from '../Pages/Admin/Login'
import ProductManage from '../Pages/Admin/ProductManage'
import App from "../App"
import ShopLayout from '../layouts/ShopLayout'
import Profile from '../Pages/user/Profile'
import Detail from '../Pages/user/Detail'
import Checkout from '../Pages/user/Checkout'
import Payment from '../Pages/user/Payment'
import Confirmpayment from '../Pages/user/Confirmpayment'
import User from '../Pages/user/User'
import AdminLayout from '../layouts/AdminLayout'
import TrackManage from '../Pages/Admin/TrackManage'
import Track from "../Pages/user/Track"
import RegisterSuccess from '../Pages/RegisterSuccess'
import CreateProduct from "../Pages/Admin/CreateProduct"
import authStore from '../store/authStore'
import NotFound from '../Pages/NotFound'

const guestRouter = createBrowserRouter([

    { path: "/", element: <LandingPage /> },
    { path: "register", element: <RegisterPage /> },
    { path: "login", element: <LoginPage /> },
    { path: "loginadmin", element: <Login /> },
    { path: "success", element: <RegisterSuccess /> },
    { path: "*", element: <NotFound /> },

    {
        path: "/user", element: <ShopLayout />,
        children: [
            { index: true, element: <User /> },
            { path: "detail/:id", element: <Detail /> },
            { path: "*", element: <NotFound /> },
            { path: "checkout", element: <Checkout /> },
        ]
    },

])

const userRouter = createBrowserRouter([

    { path: "/", element: <LandingPage /> },
    { path: "register", element: <RegisterPage /> },
    { path: "login", element: <LoginPage /> },
    { path: "loginadmin", element: <Login /> },
    { path: "success", element: <RegisterSuccess /> },
    { path: "*", element: <NotFound /> },

    {
        path: "/user", element: <ShopLayout />,
        children: [
            { index: true, element: <User /> },
            { path: "profile", element: <Profile /> },
            { path: "detail/:id", element: <Detail /> },
            { path: "checkout", element: <Checkout /> },
            { path: "payment/:orderId", element: <Payment /> },
            { path: "confirmpayment", element: <Confirmpayment /> },
            { path: "track", element: <Track /> },
            { path: "*", element: <NotFound /> },
        ]
    },

])
const adminRouter = createBrowserRouter([
    { path: "/", element: <LandingPage /> },
    { path: "register", element: <RegisterPage /> },
    { path: "login", element: <LoginPage /> },
    { path: "loginadmin", element: <Login /> },
    { path: "success", element: <RegisterSuccess /> },
    { path: "*", element: <NotFound /> },
    {
        path: "/user", element: <ShopLayout />,
        children: [
            { index: true, element: <User /> },
            { path: "profile", element: <Profile /> },
            { path: "detail/:id", element: <Detail /> },
            { path: "checkout", element: <Checkout /> },
            { path: "payment/:orderId", element: <Payment /> },
            { path: "confirmpayment", element: <Confirmpayment /> },
            { path: "track", element: <Track /> },
            { path: "*", element: <NotFound /> },
        ]
    },
    {
        path: "/admin", element: <AdminLayout />,
        children: [
            { index: true, element: <ProductManage /> },
            { path: "create", element: <CreateProduct /> },
            { path: "track", element: <TrackManage /> },
            { path: "*", element: <NotFound /> },
        ]
    }
])

export default function Approute() {
    const user = authStore((state) => state.user)
    const [router, setRouter] = useState(guestRouter)

    useEffect(() => {
        const selectRouter = user ? user.role === "ADMIN" ? adminRouter : userRouter : guestRouter
        setRouter(selectRouter)
    }, [user])
    // const router = user ? user.role === "ADMIN" ? adminRouter : userRouter : guestRouter
    return (
        <>
            <div>
                <RouterProvider router={router} />
            </div>
        </>)
}