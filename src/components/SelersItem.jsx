import { useState, useEffect } from 'react';
import { useCart } from './CartContext';
import { Link } from 'react-router-dom';
import { collection, getDocs } from "firebase/firestore";
import { db } from "../firebase";

export default function SelersItem() {
    const { addToCart } = useCart();

    const [products, setProducts] = useState([]);
    const productsCollectionRef = collection(db, 'products');

    useEffect(() => {
        const fetchProducts = async () => {
            const data = await getDocs(productsCollectionRef);
            setProducts(data.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
        };

        fetchProducts();
    }, []);

    return (
        <div className="selers__main-cards">
            {products.slice(0, 4).map((item) =>
                <div key={item.id} className='card'>
                    <div className="card__main">
                        <Link alt='products/id' to={`/product/${item.id}`}>
                            <img className='card__main-img' src={item.img} alt="" />
                        </Link>

                        <div className="card__main-text">
                            <h3>{item.name}</h3>

                            <ul className='card__main-ul'>
                                <li className='card__main-ul_price'>{item.price}$</li>
                                <li>
                                    <button onClick={() => addToCart(item)}>
                                        <img src="./img/cart.png" alt="" />
                                        Add to cart
                                    </button>
                                </li>
                            </ul>
                        </div>
                    </div>
                </div>
            )}
        </div>

    )
}

