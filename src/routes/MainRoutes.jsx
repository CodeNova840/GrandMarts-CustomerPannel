import React from 'react'
import { Routes, Route } from 'react-router-dom'
import Authroutes from 'routes/authroutes'
import DashboardLayout from 'component/dashboardlayout'
const MainRoutes = () => {
    return (
        <>
            <Routes>
                <Route path='/auth/*' element={<Authroutes />} />
                <Route path='/*' element={<DashboardLayout/>} />
            </Routes>
        </>
    )
}

export default MainRoutes
