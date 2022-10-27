import React, { useState, useEffect }from 'react';

import "../css/nav.scss";

import nopeflixLogo from "../images/nopeflix-logo.png";
import userAvatar from "../images/user-avatar.jpg";

export default function Navbar() {
    const [show, handleShow] = useState(false);
    
    useEffect(() => {
        window.addEventListener("scroll", () => {
            if (window.scrollY > 100) {
                handleShow(true)
            } else
                handleShow(false);
        });

        return () => {
            window.removeEventListener("scroll", () => {
                return;
            });
        }
    }, []);

    return (
        <div className={`navbar ${show && "nav-black"}`}>
            <img
                className='nav-logo'
                src={nopeflixLogo}
                alt="Nopeflix Logo"
            />
            <img
                className='nav-avatar'
                src={userAvatar}
                alt="User"
            />
        </div>
    )
}