import React from 'react'

export default function Footer() {
    return (
        <footer className="footer">
            <div className="footer__main">
                <div className="footer__main-info">
                    <h1><span>Flower</span> Shop</h1>
                    <p>Some random stuff about flower shop and some more info cuz this box had to get fill
                        Some random stuff about flower shop and some more info cuz this box had to get fill
                        Some random stuff about flower shop and some more info cuz this box had to get fill</p>
                </div>
                <div className="footer__main-nav">
                    <h3>Links</h3>
                    <ul>
                        <li>Home</li>
                        <li>Shop</li>
                        <li>About</li>
                        <li>Login</li>
                    </ul>
                </div>
                <div className="footer__main-nav">
                    <h3>Links</h3>
                    <ul>
                        <li>Home</li>
                        <li>Shop</li>
                        <li>About</li>
                        <li>Login</li>
                    </ul>
                </div>
                <div className="footer__main-contact">
                    <h3>Contact</h3>
                    <ul>
                        <li>
                            <img src="../img/place.svg" alt="" />
                            <h4>26985 Brighton Lane, Lake Forest, CA</h4>
                        </li>
                        <li>
                            <img src="../img/dog.svg" alt="" />
                            <h4><a href="mailto:support@Flowers.com">support@Flowers.com</a></h4>
                        </li>
                        <li>
                            <img src="../img/telefon.svg" alt="" />
                            <h4><a href="tel:+1 236 5489">+1 236 5489</a></h4>
                        </li>
                    </ul>
                </div>
            </div>
        </footer>
    )
}
