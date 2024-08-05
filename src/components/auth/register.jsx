import React, { useState } from "react";
import { auth } from '../../firebase'
import { createUserWithEmailAndPassword, updateProfile } from 'firebase/auth';
import { Link } from 'react-router-dom';
// import { doc, setDoc } from "firebase/firestore";
import { useNavigate } from 'react-router-dom'

const Register = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [username, setUsername] = useState('');
    const [error, setError] = useState('');
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const userCredential = await createUserWithEmailAndPassword(auth, email, password);
            await updateProfile(userCredential.user, {
                displayName: username,
            });
            navigate('/'); // Перенаправляємо на головну сторінку після успішної реєстрації
        } catch (error) {
            setError(error.message);
        }
    };

    return (
        <>
            <div className="register">
                <div className="register__main">
                    <div className="register__main-information">
                        <div className="register__main-information_text">
                            <ul>
                                <li>
                                    <h1>Реєстрація</h1>
                                    <h3>
                                        Реєструйтеся та отримуйте задоволення</h3>
                                </li>

                                <li>
                                    <Link to='/'>
                                        <img src="../img/home.svg" alt="" />
                                        <h3>До дому</h3>
                                    </Link>
                                </li>
                            </ul>
                        </div>

                        <form className="register__main-information_form" onSubmit={handleSubmit}>
                            <input type="username" placeholder="Ім'я" value={username} onChange={(e) => setUsername(e.target.value)} />
                            <input type="email" placeholder="Пошта" value={email} onChange={(e) => setEmail(e.target.value)} />
                            <input type="password" placeholder="Пароль" value={password} onChange={(e) => setPassword(e.target.value)} />
                            <p>Після реєстрації ви приймаєте наші <span>умови</span> та <span>політику конфіденційності</span></p>
                            <button type="submit">Реєстрація</button>
                            {error ? <p>{error}</p> : ''}
                        </form>

                        <div className="register__main-information_link">
                            Вже маєте профіль?
                            <span><Link to='/auth'>Увійдіть</Link></span>
                        </div>
                    </div>

                    <img src="../img/auth/flower2.png" alt="" />
                </div>
            </div>
        </>
    )

}

export default Register