// src/CartProviderWithRouter.js
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { CartProvider } from './CartContext';

function CartProviderWithRouter({ children }) {
    const navigate = useNavigate();

    return (
        <CartProvider navigate={navigate}>
            {children}
        </CartProvider>
    );
}

export default CartProviderWithRouter