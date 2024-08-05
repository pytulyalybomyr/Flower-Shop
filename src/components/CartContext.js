// src/CartContext.js
import React, { createContext, useContext, useState, useEffect } from 'react';
import Swal from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content';

const CartContext = createContext();

export function CartProvider({ children, navigate }) {
    const [cartItems, setCartItems] = useState(() => {
        const savedCart = localStorage.getItem('cart');
        return savedCart ? JSON.parse(savedCart) : [];
    });

    const showSwal = () => {
        withReactContent(Swal).fire({
            title: "Товар в кошику",
            text: "Ви хочете продовжити покупки чи перейти в кошик?",
            icon: "success",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Перейти в кошик",
            cancelButtonText: "Продовжити покупки"
        }).then((result) => {
            if (result.isConfirmed) {
                navigate('/cart');
            }
        });
    };

    useEffect(() => {
        localStorage.setItem('cart', JSON.stringify(cartItems));
    }, [cartItems]);

    const addToCart = (item) => {
        const itemInCart = cartItems.find((cartItem) => cartItem.id === item.id);
        if (itemInCart) {
            const updatedCart = cartItems.map((cartItem) =>
                cartItem.id === item.id ? { ...cartItem, quantity: cartItem.quantity + 1 } : cartItem
            );
            setCartItems(updatedCart);
            showSwal();
        } else {
            const updatedCart = [...cartItems, { ...item, quantity: 1 }];
            setCartItems(updatedCart);
            showSwal();
        }
    };

    return (
        <CartContext.Provider value={{ cartItems, setCartItems, addToCart }}>
            {children}
        </CartContext.Provider>
    );
}

export function useCart() {
    return useContext(CartContext);
}
