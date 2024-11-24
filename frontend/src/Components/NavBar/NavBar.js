import React from 'react'
import logo from '../../Assets/logo.png'
import profile_img from '../../Assets/profile_img.png'
import "./NavBar.css"

function NavBar() {
    return (
        <div className='navbar'>
            <div className='navbar-left'>
                <img src={logo} alt='logo' />
                <ul>
                    <li>Home</li>
                    <li>TV Shows</li>
                    <li>Movies</li>
                    <li>New $ Popular</li>
                    <li>My List</li>
                    <li>Browse by Languages</li>
                </ul>
            </div>
            <div className='navbar-right'>
               
       
               <div>
               <img src={profile_img} alt='profle' className='profile'/>
               </div>
            </div>
        </div>
    )
}

export default NavBar
