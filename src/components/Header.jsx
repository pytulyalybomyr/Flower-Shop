// src/components/Header.js
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { FaBars } from "react-icons/fa";
import { RxCross2 } from "react-icons/rx";
import { useAuth } from './auth/AuthContext';
import { useCart } from './CartContext';

export default function Header() {
    const [menuOpen, setMenuOpen] = useState(false);
    const { currentUser, logout } = useAuth();
    const { cartItems } = useCart();

    const toggleMenu = () => {
        setMenuOpen(!menuOpen);
    };

    const closeMenu = () => {
        setMenuOpen(false);
    };

    return (
        <header className='header'>
            <div className="header__main">
                <Link alt='nav' to="/"><h1><span>Flower</span> Shop</h1></Link>
                <nav className='header__main-nav'>
                    <ul>
                        <li className='active'><Link alt='nav' to="/"><h2>Home</h2></Link></li>
                        <li><Link alt='nav' to="/products"><h2>Shop</h2></Link></li>
                        <li><Link alt='nav' to="/blog"><h2>Blog</h2></Link></li>
                        <li><Link alt='nav' to="/about"><h2>About</h2></Link></li>
                    </ul>
                </nav>
                <div className="header__main-burger">
                    <FaBars onClick={toggleMenu} className='header__main-burger_icon' />
                    <div
                        className={`header__main-burger_menu ${menuOpen ? 'open__menu' : 'close__menu'}`}
                        onClick={closeMenu}
                    >
                        <div
                            className="header__main-burger_menu-block"
                            onClick={(e) => e.stopPropagation()}
                        >
                            <RxCross2 onClick={closeMenu} className='header__main-burger_menu-block_cross' />
                            <ul>
                                <li className='active'><Link alt='nav' to="/" onClick={closeMenu}><h2>Home</h2></Link></li>
                                <li><Link alt='nav' to="/products" onClick={closeMenu}><h2>Shop</h2></Link></li>
                                <li><Link alt='nav' to="/blog" onClick={closeMenu}><h2>Blog</h2></Link></li>
                                <li><Link alt='nav' to="/about" onClick={closeMenu}><h2>About</h2></Link></li>
                            </ul>

                            <ul className=''>
                                <li><Link alt='nav' to={currentUser ? '/profile' : '/auth'} onClick={closeMenu}>
                                    <img src="../img/user.png" alt="" />
                                    {currentUser ? currentUser.displayName : ''}
                                </Link>
                                    {/* {currentUser ? <button onClick={logout}>logout</button> : ''} */}
                                </li>
                                <li><Link alt='nav' to="/cart" onClick={closeMenu}>
                                    <img src="../img/cart.png" alt="" />
                                    {cartItems.length > 0 && <span>{cartItems.length}</span>}
                                </Link></li>
                            </ul>
                        </div>
                    </div>
                </div>
                <nav>
                    <ul>
                        <li><Link alt='nav' to={currentUser ? '/profile' : '/auth'}>
                            <img src="../img/user.png" alt="" />
                            <div>
                                {currentUser ? currentUser.displayName : ''}
                            </div>
                        </Link>
                            {/* {currentUser ? <button onClick={logout}>logout</button> : ''} */}
                        </li>
                        <li><Link alt='nav' to="/cart">
                            <img src="../img/cart.png" alt="" />
                            {cartItems.length > 0 && <span>{cartItems.length}</span>}
                        </Link></li>
                    </ul>
                </nav>
            </div>
        </header>
    );
}
