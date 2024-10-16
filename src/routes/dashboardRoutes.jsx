import React from 'react'
import { Routes, Route } from 'react-router-dom'
import Home from 'pages/dashboard'
import SingleProduct from 'pages/single-productPage'
import Productlisting from 'pages/product-listing'
import Cart from 'component/cart'
import OrderConfirmation from 'pages/orderConfirmationPage'
import PayNow from 'pages/pay-now-form'
const DashboardRoutes = () => {
  return (
    <>
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/product/:id' element={<SingleProduct />} />
        <Route path='/productlisting/:id' element={<Productlisting />} />
        <Route path='/subcatagory-productlisting/:id' element={<Productlisting />} />
        <Route path='/cart' element={<Cart />} />
        <Route path='/order-confirmation' element={<OrderConfirmation/>}/>
        <Route path='/payout-form' element={<PayNow/>}/>
      </Routes>
    </>
  )
}

export default DashboardRoutes
