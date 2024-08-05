import React, { useEffect, useState, useRef } from "react";
import { useAuth } from "./AuthContext";
import { Link, useNavigate } from "react-router-dom";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { updateEmail, updateProfile, sendEmailVerification } from "firebase/auth";
import { storage, db } from "../../firebase"; // Підключення Firestore
import { doc, getDoc, setDoc } from "firebase/firestore";
import Header from "../Header";
import Footer from "../Footer";
import Swal from 'sweetalert2';
import withReactContent from "sweetalert2-react-content";
import { useMask } from "@react-input/mask";

export default function UserProfile() {
    const { currentUser, logout } = useAuth();
    const [email, setEmail] = useState('');
    const [username, setUsername] = useState('');
    const [phoneNumber, setPhoneNumber] = useState('');
    const [gender, setGender] = useState('');
    const [message, setMessage] = useState('');
    const [image, setImage] = useState(null);
    const [previewUrl, setPreviewUrl] = useState('');
    const navigate = useNavigate();
    const [activeTab, setActiveTab] = useState(0);
    const EffectImage = useRef(null);

    useEffect(() => {
        if (currentUser) {
            setEmail(currentUser.email);
            setUsername(currentUser.displayName);
            setPreviewUrl(currentUser.photoURL || '../img/no logo.png');

            // Завантаження додаткових даних з Firestore
            const fetchUserData = async () => {
                const docRef = doc(db, "users", currentUser.uid);
                const docSnap = await getDoc(docRef);
                if (docSnap.exists()) {
                    setPhoneNumber(docSnap.data().phoneNumber || '');
                    setGender(docSnap.data().gender || '');
                }
            };

            fetchUserData();
        }
    }, [currentUser]);

    useEffect(() => {
        if (image && currentUser) {
            (async () => {
                const storageRef = ref(storage, `images/${currentUser.uid}/${image.name}`);
                await uploadBytes(storageRef, image);
                const imgUrl = await getDownloadURL(storageRef);
                setPreviewUrl(imgUrl);
            })();
        }
    }, [image, currentUser]);

    const handleImageChange = (e) => {
        if (e.target.files[0]) {
            setImage(e.target.files[0]);
            setPreviewUrl(URL.createObjectURL(e.target.files[0]));
        }
    };

    const inputRef = useMask({ mask: '+38 (___) ___-__-__', replacement: { _: /\d/ } });

    const showSwal = () => {
        withReactContent(Swal).fire({
            title: "Оновлено",
            text: "Всі зміни профілю збережені",
            icon: "success",
        })
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!currentUser) {
            setMessage('Користувач не авторизований');
            return;
        }

        try {
            if (email !== currentUser.email) {
                await updateEmail(currentUser, email);
                await sendEmailVerification(currentUser);
                showSwal('Електронна пошта оновлена', 'Будь ласка, перевірте свою електронну пошту для підтвердження.');
                console.log('Email оновлено');
                return; // Завершуємо виконання, оскільки очікуємо на підтвердження
            }
            if (username !== currentUser.displayName) {
                await updateProfile(currentUser, { displayName: username });
                showSwal('Ім\'я користувача оновлено', 'Ім\'я користувача було успішно оновлено.');
                console.log('Username оновлено');
            }
            if (image) {
                const storageRef = ref(storage, `images/${currentUser.uid}/${image.name}`);
                await uploadBytes(storageRef, image);
                const imgUrl = await getDownloadURL(storageRef);
                await updateProfile(currentUser, { photoURL: imgUrl });
                setPreviewUrl(imgUrl);
                showSwal('Зображення оновлено', 'Зображення профілю було успішно оновлено.');
                console.log('Зображення оновлено');
            }

            const docRef = doc(db, "users", currentUser.uid);
            const docSnap = await getDoc(docRef);

            if (docSnap.exists()) {
                const userData = docSnap.data();
                if (userData.phoneNumber !== phoneNumber) {
                    await setDoc(docRef, { phoneNumber }, { merge: true });
                    showSwal('Номер телефону оновлено', 'Номер телефону було успішно оновлено.');
                    console.log('Номер телефону оновлено');
                }
                if (userData.gender !== gender) {
                    await setDoc(docRef, { gender }, { merge: true });
                    showSwal('Стать оновлено', 'Стать було успішно оновлено.');
                    console.log('Стать оновлено');
                }
            } else {
                await setDoc(docRef, { phoneNumber, gender }, { merge: true });
                showSwal('Дані користувача оновлено', 'Дані користувача було успішно оновлено.');
                console.log('Дані користувача оновлено');
            }

            setMessage('Все пройшло успішно');
        } catch (error) {
            console.error('Помилка при оновленні профілю: ', error);
            setMessage('Не вдалося оновити профіль: ' + error.message);
        }
    };

    const handleLogout = () => {
        logout();
        navigate('/');
    };

    const handleTabClick = (index) => {
        setActiveTab(index);
    };
    const tabs = [
        {
            name: 'Мої дані', content: (
                <div className="userprofile__main-allinside">
                    <div className="userprofile__main-allinside_header">
                        <h1>Мої дані</h1>
                        <button onClick={handleSubmit}>Підтвердити</button>
                    </div>
                    <div className="userprofile__main-allinside_main">
                        <div className="userprofile__main-allinside_main-form">
                            <form>
                                <div className="userprofile__main-allinside_main-form_img">
                                    <img src={previewUrl} onError={(e) => { e.target.src = '../img/no logo.png' }} alt="photo_user" />
                                    <label>
                                        <span>Upload</span>
                                        <input type="file" name="file" onChange={handleImageChange} />
                                    </label>
                                </div>
                                <div className="userprofile__main-allinside_main-form_inputs">
                                    <div className="input-standart" id='username'>
                                        <h3>Username</h3>
                                        <input type="text" value={username} onChange={(e) => setUsername(e.target.value)} />
                                    </div>
                                    <div className="input-standart" id="email">
                                        <h3>Email</h3>
                                        <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} />
                                    </div>
                                    <div className="input-standart" id="phoneNumber">
                                        <h3>Phone number</h3>
                                        <input ref={inputRef} type="text" value={phoneNumber} onChange={(e) => setPhoneNumber(e.target.value)} />
                                    </div>
                                    <div className="input-standart" id="gender">
                                        <h3>Gender</h3>
                                        <select type="text" value={gender} onChange={(e) => setGender(e.target.value)} placeholder="Male">
                                            <option value="Male">Male</option>
                                            <option value="Female">Female</option>
                                            <option value="No option">No option</option>
                                        </select>

                                    </div>
                                </div>
                            </form>
                        </div>
                    </div >
                </div >
            )
        },
        { name: 'Таб 2', content: 'Контент для Табу 2' },
        { name: 'Таб 3', content: 'Контент для Табу 3' },
    ];

    if (!currentUser) {
        return <p>Please log in.</p>;
    }

    return (
        <div>
            <div className='wrapper_header'>
                <Header />
            </div>
            <div className='wrapper_container'>
                <div className='wrapper'>
                    <div className="userprofile">
                        <div className="userprofile__main">
                            <div className="userprofile__main-user">
                                <div className="userprofile__main-user_info">
                                    <img src={currentUser.photoURL} onError={(e) => { e.target.src = '../img/no logo.png' }} alt="photo_user" />
                                    <div className="userprofile__main-user_info-text">
                                        <h1>{currentUser.displayName}</h1>
                                        <h3 onClick={handleLogout}>Вийти</h3>
                                    </div>
                                </div>
                                <div className="userprofile__main-user_nav">
                                    <nav>
                                        <ul>
                                            {tabs.map((tab, index) => (
                                                <li
                                                    key={index}
                                                    className={`tab-title ${index === activeTab ? 'active' : ''}`}
                                                    onClick={() => handleTabClick(index)}
                                                >
                                                    <img src="../img/info-disactive.svg" alt="" />
                                                    {tab.name}
                                                </li>
                                            ))}
                                        </ul>
                                    </nav>
                                </div>
                                <div className="userprofile__main-user_contact">
                                    <img src="../img/contact.svg" alt="" />
                                    <h2>Contact with us</h2>
                                </div>
                            </div>
                            <div className="tab-content">
                                {tabs[activeTab].content}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <Footer />
        </div>
    );
}


{/* <img src={currentUser.photoURL || 'default_image_url'} alt="photo_user" />
                                    <h1>{currentUser.displayName}</h1>

                                    <form onSubmit={handleSubmit}>
                                        <div>
                                            <label>Електронна пошта:</label>
                                            <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} />
                                        </div>
                                        <div>
                                            <label>Ім'я користувача:</label>
                                            <input type="text" value={username} onChange={(e) => setUsername(e.target.value)} />
                                        </div>
                                        <div>
                                            <label>Зображення профілю:</label>
                                            <input type="file" onChange={handleImageChange} />
                                        </div>
                                        <button type="submit">Оновити профіль</button>
                                    </form>
                                    {currentUser.email === 'test@test.com' && <Link alt='admin' to='/admin'><button>ADMIN</button></Link>} */}