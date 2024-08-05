import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { collection, getDocs, addDoc, deleteDoc, doc, query, orderBy, limit, startAfter } from "firebase/firestore";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { db, storage } from "../firebase";
import Header from "./Header";
import Footer from "./Footer";
import Starts from "./Starts";
import HeaderImgs from "./HeaderImgs";
import Popup from "reactjs-popup";
import "reactjs-popup/dist/index.css";
import { useAuth } from "./auth/AuthContext";
import Rating from '@mui/material/Rating';
import Box from '@mui/material/Box';
import StarIcon from '@mui/icons-material/Star';
import ExitToAppIcon from '@mui/icons-material/ExitToApp';
import ClearIcon from '@mui/icons-material/Clear';

export default function CarDetail() {
    const { currentUser } = useAuth();
    const [previewUrl, setPreviewUrl] = useState('');
    const [cart, setCart] = useState(() => {
        const savedCart = localStorage.getItem("cart");
        return savedCart ? JSON.parse(savedCart) : [];
    });


    const fetchReviews = async () => {
        const q = query(reviewsCollectionRef, orderBy('timestamp'), limit(5));
        const data = await getDocs(q);
        setLastVisible(data.docs[data.docs.length - 1]);
        setReviews(data.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
    };

    const { id } = useParams();
    const [products, setProducts] = useState([]);
    const [reviews, setReviews] = useState([]);
    const [newReview, setNewReview] = useState({ user: '', text: '', stars: 2, img: '' });
    const [lastVisible, setLastVisible] = useState(null);
    const productsCollectionRef = collection(db, "products");
    const reviewsCollectionRef = collection(db, "products", id, "reviews");
    const [value, setValue] = React.useState(2);
    const [hover, setHover] = React.useState(-1);



    const labels = {
        0.5: 'Useless',
        1: 'Useless+',
        1.5: 'Poor',
        2: 'Poor+',
        2.5: 'Ok',
        3: 'Ok+',
        3.5: 'Good',
        4: 'Good+',
        4.5: 'Excellent',
        5: 'Excellent+',
    };

    function getLabelText(value) {
        return `${value} Star${value !== 1 ? 's' : ''}, ${labels[value]}`;
    }

    useEffect(() => {
        localStorage.setItem("cart", JSON.stringify(cart));
    }, [cart]);

    useEffect(() => {
        const fetchProducts = async () => {
            const data = await getDocs(productsCollectionRef);
            setProducts(data.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
        };

        fetchProducts();
        fetchReviews();
    }, []);

    const loadMoreReviews = async () => {
        const q = query(reviewsCollectionRef, orderBy('timestamp'), startAfter(lastVisible), limit(5));
        const data = await getDocs(q);
        setLastVisible(data.docs[data.docs.length - 1]);
        setReviews((prev) => [...prev, ...data.docs.map((doc) => ({ ...doc.data(), id: doc.id }))]);
    };

    const addToCart = (item) => {
        const itemInCart = cart.find((cartItem) => cartItem.id === item.id);
        if (itemInCart) {
            const updatedCart = cart.map((cartItem) =>
                cartItem.id === item.id
                    ? { ...cartItem, quantity: cartItem.quantity + 1 }
                    : cartItem
            );
            setCart(updatedCart);
        } else {
            const updatedCart = [...cart, { ...item, quantity: 1 }];
            setCart(updatedCart);
        }
    };

    const handleImageChange = (e) => {
        if (e.target.files[0]) {
            setPreviewUrl(URL.createObjectURL(e.target.files[0]));
            setNewReview((prev) => ({ ...prev, img: e.target.files[0] }));
        }
    };

    const handleReviewChange = (e) => {
        const { name, value } = e.target;
        setNewReview((prev) => ({ ...prev, [name]: value }));
    };

    const submitReview = async (close) => {
        const { user, text, stars, img } = newReview;
        let imgUrl = '';
        if (img) {
            const storageRef = ref(storage, `reviews/${id}/${img.name}`);
            await uploadBytes(storageRef, img);
            imgUrl = await getDownloadURL(storageRef);
        }

        if (!currentUser) {
            await addDoc(reviewsCollectionRef, { user, text, stars: Number(stars), img: imgUrl, timestamp: new Date() });
        } else {
            await addDoc(reviewsCollectionRef, { user, text, stars: Number(stars), userId: currentUser.uid, img: imgUrl, timestamp: new Date() });
        }

        setNewReview({ user: '', text: '', stars: 0, img: '' });
        setPreviewUrl('');
        fetchReviews();
        close(); // Закрити модальне вікно після успішного додавання відгуку
    };

    const deleteReview = async (reviewId, userId) => {
        if (currentUser.uid !== userId) {
            alert("You can only delete your own reviews.");
            return;
        }
        await deleteDoc(doc(reviewsCollectionRef, reviewId));
        setReviews((prev) => prev.filter((review) => review.id !== reviewId));
    };

    const flower = products.find((elm) => elm.id === id); // Find the item by id

    if (!flower) {
        return <div>Car not found</div>;
    }

    return (
        <div>
            <div className="wrapper_header">
                <Header />
            </div>
            <div className="wrapper_container">
                <div className="wrapper">
                    <div className="flower">
                        <div className="flower__main">
                            <img src={flower.img} alt={flower.name} />
                            <div className="flower__main-info">
                                <h2>{flower.name}</h2>
                                <p>{flower.description}</p>
                                <div className="flower__main-info_star">
                                    <div className="flower__main-info_star-box">
                                        <img src="../img/star.svg" alt="" />
                                        <h1>{flower.q_stars}/5</h1>
                                    </div>
                                    <h2>(101 people opinion)</h2>
                                </div>
                                <div className="flower__main-info_price">
                                    <div className="flower__main-info_price-h1">
                                        <h1>{flower.price}$ / each</h1>
                                    </div>
                                    <div className="flower__main-info_price-nav">
                                        <div className="flower__main-info_price-nav-box">
                                            <button className="flower__main-info_price-nav-box_button1">
                                                <img src="../img/heard-orange.svg" alt="" />
                                                <h2>Add to favorite</h2>
                                            </button>
                                            <button
                                                onClick={() => addToCart(flower)}
                                                className="flower__main-info_price-nav-box_button2"
                                            >
                                                <img src="../img/cart-white.svg" alt="" />
                                                <h2>Add to cart</h2>
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="flower__miniBlocks">
                            <div className="flower__reviews">
                                <div className="flower__reviews-header">
                                    <h1>Reviews</h1>
                                    <Popup trigger={<h2>Add a review</h2>} modal>
                                        {(close) => (
                                            <div className="flower__reviews-header_creact">
                                                <form className="flower__reviews-header_creact-form">
                                                    <div className="flower__reviews-header_creact-form__img">
                                                        <img
                                                            src={previewUrl}
                                                            onError={(e) => {
                                                                e.target.src = "../img/no logo.png";
                                                            }}
                                                            alt="photo_user"
                                                        />
                                                        <label>
                                                            <span>Upload</span>
                                                            <input
                                                                type="file"
                                                                name="file"
                                                                onChange={handleImageChange}
                                                            />
                                                        </label>
                                                    </div>

                                                    <div className="flower__reviews-header_creact-form__text">
                                                        <input
                                                            type="text"
                                                            name="user"
                                                            className={!currentUser ? "" : ("input__background")}
                                                            value={!currentUser ? newReview.user : currentUser.displayName}
                                                            onChange={handleReviewChange}
                                                            placeholder="Your name"
                                                        />
                                                        <textarea
                                                            name="text"
                                                            value={newReview.text}
                                                            onChange={handleReviewChange}
                                                            placeholder="Your review"
                                                        />
                                                        <Box
                                                            sx={{
                                                                width: 200,
                                                                display: 'flex',
                                                                alignItems: 'center',
                                                            }}
                                                        >
                                                            <Rating
                                                                name="stars"
                                                                value={newReview.stars}
                                                                precision={0.5}
                                                                getLabelText={getLabelText}
                                                                onChange={(event, newValue) => {
                                                                    setNewReview((prev) => ({ ...prev, stars: newValue }));
                                                                }}
                                                                onChangeActive={(event, newHover) => {
                                                                    setHover(newHover);
                                                                }}
                                                                emptyIcon={<StarIcon style={{ opacity: 0.55 }} fontSize="inherit" />}
                                                            />
                                                            {newReview.stars !== null && (
                                                                <Box sx={{ ml: 2 }}>{labels[hover !== -1 ? hover : newReview.stars]}</Box>
                                                            )}
                                                        </Box>
                                                        <button type="button" onClick={() => submitReview(close)}><h3>Submit</h3><ExitToAppIcon /></button>
                                                    </div>
                                                </form>
                                            </div>
                                        )}
                                    </Popup>
                                </div>
                                <div className="flower__reviews-main">
                                    {reviews.map((review) => (
                                        <div className="flower__reviews-main-box_item" key={review.id}>
                                            <img src={review.img || "../img/no logo.png"} alt={review.user} />
                                            <div className="flower__reviews-main-box_item-text">
                                                <h1>{!currentUser ? review.user : currentUser.displayName}</h1>
                                                <p>{review.text}</p>
                                                <Starts stars={review.stars}></Starts>
                                            </div>
                                            {currentUser && currentUser.uid === review.userId && (
                                                <button onClick={() => deleteReview(review.id, review.userId)}><ClearIcon /></button>
                                            )}
                                        </div>
                                    ))}
                                </div>
                                {reviews.length > 10 && (<button onClick={loadMoreReviews}>Load More Reviews</button>)}
                            </div>
                            <div className="flower__like">
                                <div className="card__main-img">
                                    <HeaderImgs count={4} />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div >
            <Footer />
        </div >
    );
}
