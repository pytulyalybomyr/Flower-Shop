import React from 'react';
import Starts from './Starts';
import { Swiper, SwiperSlide } from 'swiper/react';

import 'swiper/swiper-bundle.css';

// Імпорт додаткових модулів Swiper
import SwiperCore from 'swiper';
import { Autoplay } from 'swiper/modules';

// Ініціалізація модулів
SwiperCore.use([Autoplay]);

export default function Comments() {
    const list = [
        {
            logo: '../img/comments/atena.png',
            name: 'Atena',
            text: 'I’m buying flower from them every weak, always fresh flowers and beutiful😍🌻... love’em so nuch..keep going 💯💯',
            stars: 4,
        },
        {
            logo: '../img/comments/boy.png',
            name: 'pop Boy',
            text: 'I get flowers from them for my baby mama, she love them so much 🔥💯',
            stars: 5,
        },
        {
            logo: '../img/comments/girl.png',
            name: 'Young Girl4',
            text: "Drip too hard, don't stand too close You gon' fuck around and drown off this wave",
            stars: 5,
        },
        {
            logo: '../img/comments/girl.png',
            name: 'Young Girl4',
            text: "Drip too hard, don't stand too close You gon' fuck around and drown off this wave",
            stars: 5,
        },
        {
            logo: '../img/comments/girl.png',
            name: 'Young Girl3',
            text: "Drip too hard, don't stand too close You gon' fuck around and drown off this wave",
            stars: 5,
        },
    ];

    return (
        <>
            <Swiper
                spaceBetween={0} // Відступи між слайдами
                breakpoints={{
                    1250: {
                        slidesPerView: 3, // Відображати 3 слайди при ширині >= 1040px
                    },
                    1220: {
                        slidesPerView: 3,
                    },
                    710: {
                        slidesPerView: 1.7,
                    },
                    630: {
                        slidesPerView: 1.5,
                    },
                    0: {
                        centeredSlides: true,
                        slidesPerView: 1,
                        // Відображати 2.3 слайди при ширині < 1040px
                    }
                }} // Кількість слайдів, що відображаються одночасно
                autoplay={{
                    delay: 3000, // Затримка між автопрокруткою в мілісекундах
                    disableOnInteraction: false, // Автопрокрутка не зупиняється при взаємодії
                }}
                loop={true} // Безкінечний цикл
            >
                {
                    list.map((item, index) => (
                        <SwiperSlide key={index}>
                            <div className='comments__main_card'>
                                <div className="comments__main_card-info">
                                    <img src={item.logo} alt="" />
                                </div>
                                <div className="comments__main_card-detais">
                                    <h1>{item.name}</h1>
                                    <p>{item.text}</p>
                                    <Starts stars={item.stars} />
                                </div>
                            </div>
                        </SwiperSlide>
                    ))
                }
            </Swiper>
        </>
    );
}
