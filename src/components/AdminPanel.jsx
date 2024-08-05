import React, { useState, useEffect } from "react";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { collection, addDoc, deleteDoc, doc, getDocs, updateDoc } from "firebase/firestore";
import { db, storage } from "../firebase";
import { useAuth } from "./auth/AuthContext";

const AdminPanel = () => {
    // const [currentUser] = useAuth()
    const { currentUser } = useAuth()

    const [name, setName] = useState('');
    const [price, setPrice] = useState('');
    const [description, setDescription] = useState('');
    const [image, setImage] = useState(null);
    const [uploading, setUploading] = useState(false);

    const handleImageChange = (e) => {
        if (e.target.files[0]) {
            setImage(e.target.files[0]);
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (image) {
            setUploading(true);
            const storageRef = ref(storage, `images/${image.name}`);
            try {
                await uploadBytes(storageRef, image);
                const imgUrl = await getDownloadURL(storageRef);
                await addDoc(collection(db, "products"), {
                    name,
                    price,
                    description,
                    img: imgUrl,
                    q_stars: 4.5
                });
                setUploading(false);
                setName('');
                setPrice('');
                setDescription('');
                setImage(null);
                alert('Product added successfully!');
                window.location.reload()
            } catch (error) {
                setUploading(false);
                alert('Error uploading image: ' + error.message);
            }
        } else {
            alert('Please select an image to upload');
        }
    };

    const [products, setProducts] = useState([]);
    const productsCollectionRef = collection(db, 'products');

    useEffect(() => {
        const fetchProducts = async () => {
            const data = await getDocs(productsCollectionRef);
            setProducts(data.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
        };

        fetchProducts();
    }, []);

    const deleteProduct = async (id) => {
        const productRef = doc(db, 'products', id);
        try {
            await deleteDoc(productRef);
            alert('Товар видалено успішно!');
            window.location.reload()
        } catch (error) {
            console.error('Error deleting document: ', error);
            alert('Не вдалося видалити товар: ' + error.message);
        }
    };


    return (
        currentUser.email === 'test@test.com' ?
            <div>
                <h2>Додати продукт</h2>
                <form onSubmit={handleSubmit}>
                    <div>
                        <label>Назва продукту:</label>
                        <input type="text" value={name} onChange={(e) => setName(e.target.value)} required />
                    </div>
                    <div>
                        <label>Ціна:</label>
                        <input type="number" value={price} onChange={(e) => setPrice(e.target.value)} required />
                    </div>
                    <div>
                        <label>Опис продукту:</label>
                        <textarea value={description} onChange={(e) => setDescription(e.target.value)} required />
                    </div>
                    <div>
                        <label>Зображення:</label>
                        <input type="file" onChange={handleImageChange} required />
                    </div>
                    <button type="submit" disabled={uploading}>
                        {uploading ? 'Завантаження...' : 'Додати продукт'}
                    </button>
                </form>

                <ul>
                    {products.map(product => (
                        <li key={product.id}>
                            <span>{product.name}</span>
                            <button onClick={() => deleteProduct(product.id)}>Delete</button>
                        </li>
                    ))}
                </ul>
            </div >

            : ''
    );
};

export default AdminPanel;
