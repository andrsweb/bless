import Swiper from "swiper"
import { EffectFade } from 'swiper/modules'

document.addEventListener('DOMContentLoaded', () => {
    'use strict'

    sectionsScroll('.sections-scroll')
})

const sectionsScroll = (selector) => {
    let isAnimating = false

    if (!selector) return

    const verticalSwiper = new Swiper(selector, {
        direction: 'vertical',
        mousewheel: false,
        keyboard: {
            enabled: true,
        },
        allowTouchMove: false,

        on: {
            slideChangeTransitionStart: () => {
                isAnimating = true
            },
            slideChangeTransitionEnd: () => {
                isAnimating = false
            },
        },

        speed: 1000,
    })

    const handleScroll = (delta, currentSlider, nextSlider) => {
        if (isAnimating) return

        if (delta > 0) {
            currentSlider.slideNext()
            if (nextSlider) nextSlider.slideNext()
        } else if (delta < 0) {
            currentSlider.slidePrev()
            if (nextSlider) nextSlider.slidePrev()
        }
    }

    const setupSlider = (sliderSelector, options, nextSlider) => {
        const slider = new Swiper(sliderSelector, {
            parent: selector,
            ...options,

            on: {
                slideChangeTransitionStart: () => {
                    isAnimating = true
                },
                slideChangeTransitionEnd: () => {
                    isAnimating = false

                    const lastSlide = slider.slides.length - 1
                    const isLastSlide = slider.activeIndex === lastSlide

                    if (isLastSlide) {
                        const lastSlideElement = slider.slides[lastSlide]
                        lastSlideElement.classList.add('animated')

                        verticalSwiper.allowSlidePrev = false
                        verticalSwiper.allowSlideNext = true

                        slider.allowSlidePrev = false
                        slider.allowSlideNext = false

                        setTimeout(() => {
                            verticalSwiper.slideNext()
                            verticalSwiper.allowSlideNext = false
                            if (nextSlider) nextSlider.slideTo(0)

                            verticalSwiper.allowSlidePrev = false
                            verticalSwiper.allowSlideNext = false
                        }, 1000)
                    }
                },
            },
        })

        return slider
    }

    const horizontalSlider = setupSlider('.slots-swiper', {
        direction: 'horizontal',
        slidesPerView: 1,
        mousewheel: false,
        keyboard: {
            enabled: true,
        },
        allowTouchMove: false,
    })

    const horizontalNftSlider = setupSlider('.nft-swiper', {
        direction: 'horizontal',
        slidesPerView: 1,
        mousewheel: false,
        keyboard: {
            enabled: true,
        },
        allowTouchMove: false,

        modules: [EffectFade],
        effect: "fade",
    }, horizontalSlider)

    verticalSwiper.on('slideChange', () => {
        const header = document.querySelector('.header')
        const isFirstSlide = verticalSwiper.activeIndex === 0

        header.classList.toggle('removed', !isFirstSlide)

        if (verticalSwiper.activeIndex === 1) {
            verticalSwiper.allowSlidePrev = false
            verticalSwiper.allowSlideNext = false

            horizontalSlider.allowSlidePrev = false
            horizontalSlider.allowSlideNext = true

            horizontalNftSlider.allowSlidePrev = false
            horizontalNftSlider.allowSlideNext = true
        }
    })

    document.addEventListener('wheel', (e) => {
        const delta = Math.sign(e.deltaY)

        if (verticalSwiper.activeIndex === 1) {
            handleScroll(delta, horizontalSlider)
        } else {
            handleScroll(delta, horizontalNftSlider, verticalSwiper)
        }
    })

    let touchStartY

    document.addEventListener('touchstart', (event) => {
        if (isAnimating) return

        touchStartY = event.touches[0].clientY
    })

    document.addEventListener('touchend', (event) => {
        const swipers = document.querySelectorAll('.swiper')
        if (isAnimating) return

        const touchEndY = event.changedTouches[0].clientY
        const deltaY = touchEndY - touchStartY

        swipers.forEach(swiper => {
            if (deltaY > 50) {
                swiper.slidePrev()
            } else if (deltaY < -50) {
                swiper.slideNext()
            }
        })
    })
}
