import React from 'react'
import Users from './pages/Users/users'
import MyItems from './pages/MyItems/my-items'
import Home from './pages/Home/home'
import Navbar from "./Navbar"

import { BrowserRouter, Route, Routes } from 'react-router-dom'

import './shared.css'



const App = () => {

    return (
        <>
            <Navbar />

            <Routes>
                <Route path='/' element={<Home />} />
                <Route path='/users' element={<Users />} />
                <Route path='/my-items' element={<MyItems />} />
            </Routes>

        </>
    );
}

export default App;