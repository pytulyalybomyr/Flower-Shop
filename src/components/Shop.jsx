// src/Shop.js
import React, { useState, useEffect } from 'react';
import { Link, useParams, useNavigate } from 'react-router-dom';
import { collection, getDocs } from 'firebase/firestore';
import { db } from '../firebase'; // Імпорт Firebase конфігурації
import Header from './Header';
import Footer from './Footer';
import Swal from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content';

export default function Shop() {
    const { search } = useParams();
    const navigate = useNavigate();
    const [cart, setCart] = useState(() => {
        const savedCart = localStorage.getItem('cart');
        return savedCart ? JSON.parse(savedCart) : [];
    });

    const [products, setProducts] = useState([]);
    const productsCollectionRef = collection(db, 'products');

    useEffect(() => {
        const fetchProducts = async () => {
            const data = await getDocs(productsCollectionRef);
            setProducts(data.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
        };

        fetchProducts();
    }, []);

    const showSwal = () => {
        withReactContent(Swal).fire({
            title: "Товар у кошику",
            text: "Ви хочете продовжити покупки чи перейти у кошик?",
            icon: "success",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Перейти у кошик",
            cancelButtonText: "Продовжити покупки"
        }).then((result) => {
            if (result.isConfirmed) {
                navigate('/cart');
            }
        });
    };

    useEffect(() => {
        localStorage.setItem('cart', JSON.stringify(cart));
    }, [cart]);

    const addToCart = (item) => {
        const itemInCart = cart.find((cartItem) => cartItem.id === item.id);
        if (itemInCart) {
            const updatedCart = cart.map((cartItem) =>
                cartItem.id === item.id ? { ...cartItem, quantity: cartItem.quantity + 1 } : cartItem
            );
            setCart(updatedCart);
        } else {
            const updatedCart = [...cart, { ...item, quantity: 1 }];
            setCart(updatedCart);
        }
        showSwal();
    };

    const [query, setQuery] = useState(search || '');
    const [searchResults, setSearchResults] = useState(products);

    useEffect(() => {
        if (search) {
            const filteredResults = products.filter(item =>
                item.name.toLowerCase().includes(search.toLowerCase())
            );
            setSearchResults(filteredResults);
        } else {
            setSearchResults(products);
        }
    }, [search, products]);

    const handleChange = (e) => {
        setQuery(e.target.value);
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        navigate(`/products/${query}`);
    };

    return (
        <>
            <div>
                <div className='wrapper_header'>
                    <Header />
                </div>
                <div className='wrapper_container'>
                    <div className='wrapper'>
                        <div className="catalog">
                            <div className="catalog__nav">
                                <div className="catalog__nav-main">
                                    <div className="catalog__nav-main__filtering delete_adaptiv">
                                        <img src="../img/filter.svg" alt="" />
                                        <h3>Filtering</h3>
                                    </div>
                                    <form className="catalog__nav-main__box" onSubmit={handleSubmit}>
                                        <input
                                            type="text"
                                            onChange={handleChange}
                                            placeholder="Search..."
                                            value={query}
                                        />
                                        <button
                                            className="catalog__nav-main__box-button"
                                            type="submit"
                                        >
                                            <img src="../img/search.svg" alt="" />
                                        </button>
                                    </form>
                                    <div className="catalog__nav-main__filters-container">
                                        <div className="catalog__nav-main__filtering add_adaptiv">
                                            <img src="../img/filter.svg" alt="" />
                                            <h3>Filtering</h3>
                                        </div>
                                        <div className="catalog__nav-main__filtering">
                                            <img src="../img/price.svg" alt="" />
                                            <h3>Cheap</h3>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="catalog__items">
                                {searchResults.map((item) => (
                                    <div key={item.id} className="catalog__main">
                                        <Link alt='product/id' to={`/product/${item.id}`}>
                                            <img
                                                className='catalog__main-img'
                                                src={item.img}
                                                alt={item.name}
                                            />
                                        </Link>
                                        <div className="catalog__main-text">
                                            <h3>{item.name}</h3>
                                            <ul className='catalog__main-ul'>
                                                <li className='catalog__main-ul_price'>{item.price}$</li>
                                                <li>
                                                    <button onClick={() => addToCart(item)}>
                                                        <img src="../img/cart.png" alt="" />
                                                        Add to cart
                                                    </button>
                                                </li>
                                            </ul>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
                <Footer />
            </div>
        </>
    );
}
