import React from 'react'
import Users from './pages/Users/users'
import MyItems from './pages/MyItems/my-items'
import Home from './pages/Home/home'
import Navbar from "./Navbar"
import { useState } from 'react';
import { Route, Routes } from 'react-router-dom'

import './shared.css'
import './index.css'



const App = () => {
    return (
        <>
            <Navbar />

            <Navbar2>
                <NavItem icon="😊" />
                <NavItem icon="😍" />
                <NavItem icon="🔽">
                    <DropdownMenu />
                </NavItem>
            </Navbar2>

            <Routes>
                <Route path='/' element={<Home />} />
                <Route path='/users' element={<Users />} />
                <Route path='/my-items' element={<MyItems />} />
            </Routes>

        </>
    );
}

function Navbar2(props) {
    return (
        <nav className='navbar2'>
            <ul className='navbar2-nav'> { props.children } </ul>
        </nav>
    );
}

function NavItem(props) {

    const [open, setOpen] = useState(false);

    return (
        <li className='nav2-item'>
            <a href="#" className="icon-button" onClick={() => setOpen(!open)}>
                {props.icon}
            </a>

            {open && props.children}
        </li>
    )
}

function DropdownMenu() {

    function DropdownItem(props) {
        return (
            <a href="#" className='menu2-item'>
                <span className="icon-button">{props.leftIcon}</span>

                {props.children}

                <span className="icon-right">{props.rightIcon}</span>
            </a>
        )
    }
    return (
        <div className="dropdown2">
            <DropdownItem> My Profile</DropdownItem>
            <DropdownItem leftIcon="⚙" rightIcon="▶"> Settings</DropdownItem>
        </div>
    )
}

export default App;