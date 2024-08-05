import React, { useState } from "react";
import { auth } from '../../firebase'
import { signInWithEmailAndPassword } from 'firebase/auth';
import { Link, useNavigate } from 'react-router-dom';


const Login = () => {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [error, setError] = useState('')
    const navigate = useNavigate()

    const handelSubmit = async (e) => {
        e.preventDefault()
        setError('')

        try {
            await signInWithEmailAndPassword(auth, email, password)
            navigate('/')
        } catch (error) {
            setError(error.message)

        }
    }

    return (
        <>
            <div className="login">
                <div className="login__main">
                    <div className="login__main-information">
                        <div className="login__main-information_text">
                            <ul>
                                <li>
                                    <h1>Вхід</h1>
                                    <h3>Увійдіть і отримуйте задоволення</h3>
                                </li>

                                <li>
                                    <Link to='/'>
                                        <img src="../img/home.svg" alt="" />
                                        <h3>До дому</h3>
                                    </Link>
                                </li>
                            </ul>
                        </div>

                        <form className="login__main-information_form" onSubmit={handelSubmit}>
                            <input type="email" placeholder="Пошта" value={email} onChange={(e) => setEmail(e.target.value)} />
                            <input type="password" placeholder="Пароль" value={password} onChange={(e) => setPassword(e.target.value)} />
                            <h4>Забули Пароль?</h4>
                            <button type="submit">Login</button>
                            {error ? <p>{error}</p> : ''}
                        </form>

                        <div className="login__main-information_link">
                            Не маєте профілю?
                            <span><Link to='/auth/registration'>Зареєструйтеся</Link></span>
                        </div>
                    </div>

                    <img src="../img/auth/flower1.png" alt="" />
                </div>
            </div>


        </>
    )

}

export default Login