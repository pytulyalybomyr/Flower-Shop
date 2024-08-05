import { getDocs } from "firebase/firestore";
import { collection } from "firebase/firestore";
import { Link } from "react-router-dom";
import { db } from "../firebase";
import React from "react";

export default function HeaderImgs({ count }) {
    const [products, setProducts] = React.useState([]);
    const productsCollectionRef = collection(db, "products");

    React.useEffect(() => {
        const fetchProducts = async () => {
            const data = await getDocs(productsCollectionRef);
            setProducts(data.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
        };

        fetchProducts();
    }, []);

    const [randomIndices, setRandomIndices] = React.useState([]);

    React.useEffect(() => {
        const generateRandom = () => {
            const newIndices = [];
            const productCount = parseInt(count, 10);
            if (!isNaN(productCount) && products.length > 0) {
                while (newIndices.length < productCount) {
                    const index = Math.floor(Math.random() * products.length);
                    if (!newIndices.includes(index)) {
                        newIndices.push(index);
                    }
                }
                setRandomIndices(newIndices);
            }
        };
        generateRandom();
    }, [products, count]);

    return (
        <>
            {randomIndices.map((index) => (
                <div key={products[index].id} className="card__img-container">
                    <img
                        className="card__img"
                        src={products[index].img}
                        alt={products[index].name}
                    />
                    <Link to={`/product/${products[index].id}`} className="card__link"></Link>
                </div>
            ))}
        </>
    );
}
