import React from 'react'
import { Routes, Route } from 'react-router-dom'
const Authroutes = () => {
    return (
        <>
            <Routes>
                <Route path='login' element={<Authroutes />} />
            </Routes>
        </>
    )
}

export default Authroutes;
