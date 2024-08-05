// src/components/Cart.js
import React, { useState, useEffect } from 'react';
import Header from './Header';
import Footer from './Footer';
import Alert from '@mui/material/Alert';
import { useCart } from './CartContext';

export default function Cart() {
    const { cartItems, setCartItems } = useCart();
    const [text, setText] = useState(false);
    const [len, setLen] = useState(cartItems.length > 0);

    const showText = () => {
        setText(true);
    };

    useEffect(() => {
        if (cartItems.length > 0) {
            setLen(true);
        }
    }, [cartItems]);

    const increaseQuantity = (itemName) => {
        const updatedCart = cartItems.map(item =>
            item.name === itemName ? { ...item, quantity: (item.quantity || 1) + 1 } : item
        );
        setCartItems(updatedCart);
    };

    const decreaseQuantity = (itemName) => {
        const updatedCart = cartItems.map(item =>
            item.name === itemName ? { ...item, quantity: Math.max(0, (item.quantity || 1) - 1) } : item
        ).filter(item => item.quantity !== 0);
        setCartItems(updatedCart);
    };

    const removeFromCart = (itemName) => {
        const updatedCart = cartItems.filter(item => item.name !== itemName);
        setCartItems(updatedCart);
    };

    const calculateTotalPrice = () => {
        return cartItems.reduce((total, item) => total + (item.price * item.quantity), 0);
    };

    return (
        <>
            <div>
                <div className='wrapper_header'>
                    <Header />
                </div>
                <div className='wrapper_container'>
                    <div className='wrapper'>
                        {len ? (
                            <div className="cart">
                                <div className="cart__main">
                                    <h2 className='cart__main-logoText'>Your Cart</h2>
                                    <ul className='cart__main-items'>
                                        {cartItems.map((item) => (
                                            <li className='cart__main-item' key={item.id}>
                                                <div className="cart__main-item_info">
                                                    <img className='cart__main-item_img' src={item.img} alt="" />
                                                    <div className="cart__main-item_info__description">
                                                        <div className="cart__main-item_info__description-text">
                                                            <h2>{item.name}</h2>
                                                            <h5>sun lover flower</h5>
                                                        </div>
                                                        <div className="cart__main-item_info__description-nav">
                                                            <h5>unit price {item.price}$</h5>
                                                            <div className="cart__main-item_info__description-nav_counter">
                                                                <button onClick={() => increaseQuantity(item.name)}>+</button>{' '}
                                                                <h3>{item.quantity}{' '}</h3>
                                                                <button onClick={() => decreaseQuantity(item.name)}>-</button>{' '}
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                                <div className="cart__main-item_main">
                                                    <button onClick={() => removeFromCart(item.name)}>
                                                        <img src="./img/dump.svg" alt="" />
                                                    </button>
                                                    <h3>Total {item.price * item.quantity}$</h3>
                                                </div>
                                            </li>
                                        ))}
                                    </ul>
                                </div>
                                <div className="cart__general">
                                    <h3>Subtotal for {cartItems.length} items: <b>{calculateTotalPrice()}$</b></h3>
                                    <button onClick={() => showText()}>Checkout</button>
                                    {text && <Alert className='cart__alert' severity="error">Please, try again later</Alert>}
                                </div>
                            </div>
                        ) : (
                            <div className="empty-cart">
                                <img src="./img/big-cart.png" alt="" />
                            </div>
                        )}
                    </div>
                </div>
                <Footer />
            </div>
        </>
    );
}
