import Swiper from "swiper";

document.addEventListener('DOMContentLoaded', () => {
    'use strict';

    sectionsScroll('.sections-scroll');
});

const sectionsScroll = (selector) => {
    let isAnimating = false;

    if (!selector) return;

    const verticalSwiper = new Swiper(selector, {
        direction: 'vertical',
        mousewheel: false,
        keyboard: {
            enabled: true,
        },
        allowTouchMove: false,
        nested: true,

        on: {
            slideChangeTransitionStart: function () {
                isAnimating = true;
            },
            slideChangeTransitionEnd: function () {
                isAnimating = false;
            },
        },

        speed: 3000,
    });

    const horizontalSlider = new Swiper('.slots-swiper', {
        parent: selector,
        direction: 'horizontal',
        slidesPerView: 1,
        mousewheel: false,
        keyboard: {
            enabled: true,
        },
        allowTouchMove: false,
        nested: true,

        on: {
            slideChangeTransitionStart: function () {
                isAnimating = true;
            },
            slideChangeTransitionEnd: function () {
                isAnimating = false;
            },
        },

        speed: 3000,
    });

    verticalSwiper.on('slideChange', () => {
        const header = document.querySelector('.header');
        const isFirstSlide = verticalSwiper.activeIndex === 0;

        if (isFirstSlide) {
            header.classList.remove('removed');
        } else {
            header.classList.add('removed');
        }

        // Проверяем, достигнут ли индекс 1
        if (verticalSwiper.activeIndex === 1) {
            verticalSwiper.allowSlidePrev = false;
            verticalSwiper.allowSlideNext = false;

            // Разрешаем скролл для горизонтального слайдера
            horizontalSlider.allowTouchMove = true;
            horizontalSlider.allowSlidePrev = true;
            horizontalSlider.allowSlideNext = true;
        } else {
            verticalSwiper.allowSlidePrev = true;
            verticalSwiper.allowSlideNext = true;

            // Запрещаем скролл для горизонтального слайдера
            horizontalSlider.allowTouchMove = false;
        }
    });

    document.addEventListener('wheel', (e) => {
        if (isAnimating) {
            return;
        }

        const delta = Math.sign(e.deltaY);

        if (verticalSwiper.activeIndex === 1) {
            // Используем горизонтальный свайпер для прокрутки
            if (delta > 0) {
                horizontalSlider.slideNext();
            } else if (delta < 0) {
                horizontalSlider.slidePrev();
            }
        } else {
            // Используем вертикальный свайпер для прокрутки
            if (delta > 0) {
                verticalSwiper.slideNext();
            } else if (delta < 0) {
                verticalSwiper.slidePrev();
            }
        }
    });

    // ... (остальной код)
};
