import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import './index.scss';
import App from './App';
import Cart from './components/Cart';
import Shop from './components/Shop';
import FlowerDetail from './components/FlowerDetail';
import { AuthProvider } from './components/auth/AuthContext'
// import User from './components/User';
import Login from './components/auth/Login';
import Register from './components/auth/register';
import UserProfile from './components/auth/UserProfile';
import CartProviderWithRouter from './components/CartProviderWithRouter'
import AdminPanel from './components/AdminPanel';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <AuthProvider>
    <BrowserRouter>
      <CartProviderWithRouter>
        <Routes>
          <Route path='/' element={<App />} />
          <Route path='/cart' element={<Cart />} />
          <Route path='/products' element={<Shop />} />
          <Route path='/auth' element={<Login />} />
          <Route path='/admin' element={<AdminPanel />} />
          <Route path='/profile' element={<UserProfile />} />
          <Route path='/auth/registration' element={<Register />} />
          <Route path="/products/:search?" element={<Shop />} />
          <Route path='/product/:id' element={<FlowerDetail />} />


          <Route path='*' element={<div>Page NOT found</div>} />
        </Routes>
      </CartProviderWithRouter>
    </BrowserRouter>

  </AuthProvider>
);
