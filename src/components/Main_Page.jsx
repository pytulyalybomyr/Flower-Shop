import React from 'react'
import HeaderImgs from './HeaderImgs'
import SelersItem from './SelersItem'
import Posts from './Posts'
import Comments from './Comments'
import { Link } from 'react-router-dom';


export default function MainPage() {
    return (
        <main>
            <section className='content'>
                <div className="content__main">
                    <div className="content__main-text">
                        <h2>Flowers, 🌻 what the world needs </h2>
                        <h3>Browse between hounders of flowers</h3>
                        <Link alt='products' to="/products"><button>Browse</button></Link>
                    </div>
                    <div className='content__main-img'>
                        <HeaderImgs count={6} />
                    </div>
                </div>
            </section>
            <section className='selers'>
                <div className="selers__main">
                    <div className="selers__main-logo">
                        <div className="line"></div>
                        <h1>Best selers</h1>
                        <div className="line"></div>
                    </div>
                    <SelersItem />
                </div>
            </section>
            <section className='posts'>
                <div className="posts-logo">
                    <div className="line"></div>
                    <h1>Latest posts</h1>
                    <div className="line"></div>
                </div>
                <div className="posts__main">
                    <Posts />
                </div>
            </section>
            <section className='comments'>
                <div className="comments-logo">
                    <div className="line"></div>
                    <h1>Comments</h1>
                    <div className="line"></div>
                </div>
                <div className="comments__main">
                    <Comments />
                </div>
            </section>
        </main>
    )
}
