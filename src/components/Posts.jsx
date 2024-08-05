// Posts.js

import React from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/swiper-bundle.css';
import SwiperCore from 'swiper';
import { Autoplay } from 'swiper/modules';
SwiperCore.use([Autoplay]);

export default function Posts() {
    const list = [
        {
            name: 'Emily1',
            logo: './img/posts/emily.png',
            date: '09/03/2010',
            img: './img/posts/img_1.png',
            h1: 'Best flowers for inside home',
            p: 'All the flowers are best for your lovly house just get the one you love the most 😊',
            likes: 15,
            views: 2003
        },
        {
            name: 'Emily2',
            logo: './img/posts/emily.png',
            date: '09/03/2010',
            img: './img/posts/img_1.png',
            h1: 'Best flowers for inside home',
            p: 'All the flowers are best for your lovly house just get the one you love the most 😊',
            likes: 15,
            views: 2003
        },
        {
            name: 'Emily3',
            logo: './img/posts/emily.png',
            date: '09/03/2010',
            img: './img/posts/img_1.png',
            h1: 'Best flowers for inside home',
            p: 'All the flowers are best for your lovly house just get the one you love the most 😊',
            likes: 15,
            views: 2003
        },
        {
            name: 'Emily4',
            logo: './img/posts/emily.png',
            date: '09/03/2010',
            img: './img/posts/img_1.png',
            h1: 'Best flowers for inside home',
            p: 'All the flowers are best for your lovly house just get the one you love the most 😊',
            likes: 15,
            views: 2003
        },
        {
            name: 'Emily5',
            logo: './img/posts/emily.png',
            date: '09/03/2010',
            img: './img/posts/img_1.png',
            h1: 'Best flowers for inside home',
            p: 'All the flowers are best for your lovly house just get the one you love the most 😊',
            likes: 15,
            views: 2003
        },
        {
            name: 'Emily6',
            logo: './img/posts/emily.png',
            date: '09/03/2010',
            img: './img/posts/img_1.png',
            h1: 'Best flowers for inside home',
            p: 'All the flowers are best for your lovly house just get the one you love the most 😊',
            likes: 15,
            views: 2003
        }
    ];

    return (
        <Swiper
            spaceBetween={40}
            loop={true}
            autoplay={{
                delay: 3000,
                disableOnInteraction: false,
            }}

            centeredSlides={true}
            slidesPerView={1}
            breakpoints={{
                1250: {
                    slidesPerView: 3,
                    centeredSlides: false,
                },
                1120: {
                    slidesPerView: 2.9,
                    centeredSlides: false,
                },
                710: {
                    slidesPerView: 1.7,
                    centeredSlides: false,
                },
                630: {
                    slidesPerView: 1.5,
                    centeredSlides: true,
                },
                500: {
                    slidesPerView: 1,
                    centeredSlides: true,
                }
            }}
        >
            {list.map((item, index) => (
                <SwiperSlide key={index}>
                    <div className="posts__main__card">
                        <div className="posts__main__card__header">
                            <div className="posts__main__card__header-name">
                                <img src={item.logo} alt="" />
                                <div>{item.name}</div>
                            </div>
                            <div className="posts__main__card__header-date">{item.date}</div>
                        </div>
                        <div className="posts__main__card__main">
                            <img src={item.img} alt="" />
                            <div className="posts__main__card__main-text">
                                <h1>{item.h1}</h1>
                                <p>{item.p}</p>
                            </div>
                        </div>
                        <div className="posts__main__card__footer">
                            <div className="posts__main__card__footer-nav">
                                <ul>
                                    <li>
                                        <img src="./img/heard.svg" alt="" />
                                        {item.likes}
                                    </li>
                                    <li>
                                        <img src="./img/view.svg" alt="" />
                                        {item.views}
                                    </li>
                                </ul>
                            </div>
                            <a href="##">Read more</a>
                        </div>
                    </div>
                </SwiperSlide>
            ))}
        </Swiper>
    );
}
