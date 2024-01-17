import Swiper from "swiper"
import {EffectFade} from 'swiper/modules'

document.addEventListener('DOMContentLoaded', () => {
    'use strict'

    sectionsScroll('.sections-scroll')
})

const sectionsScroll = (selector) => {
    let isAnimating = false
    let horizontalSlider

    if (!selector) return

    const verticalSwiper = new Swiper(selector, {
        direction: 'vertical',
        mousewheel: false,
        keyboard: {
            enabled: true,
        },
        allowTouchMove: false,

        on: {
            slideChangeTransitionStart: function () {
                isAnimating = true
            },
            slideChangeTransitionEnd: function () {
                isAnimating = false
            },
        },

        speed: 1000,
    })

    horizontalSlider = new Swiper('.slots-swiper', {
        parent: selector,
        direction: 'horizontal',
        slidesPerView: 1,
        mousewheel: false,
        keyboard: {
            enabled: true,
        },
        allowTouchMove: false,

        on: {
            slideChangeTransitionStart: function () {
                isAnimating = true
            },
            slideChangeTransitionEnd: function () {
                isAnimating = false

                const lastSlide = horizontalSlider.slides.length - 1
                const isLastSlide = horizontalSlider.activeIndex === lastSlide

                if (isLastSlide) {
                    const lastSlideElement = horizontalSlider.slides[lastSlide]
                    lastSlideElement.classList.add('animated')

                    verticalSwiper.allowSlidePrev = false
                    verticalSwiper.allowSlideNext = true

                    horizontalSlider.allowSlidePrev = false
                    horizontalSlider.allowSlideNext = false

                    setTimeout(() => {
                        verticalSwiper.slideNext()
                        
                        const nextHorizontalSlideIndex = 0
                        horizontalNftSlider.slideTo(nextHorizontalSlideIndex)
    
                        verticalSwiper.allowSlidePrev = true
                        verticalSwiper.allowSlideNext = false
                    }, 1000)
                }
            },
        },

        speed: 1000,
    })

    const horizontalNftSlider = new Swiper('.nft-swiper', {
        parent: selector,
        direction: 'horizontal',
        slidesPerView: 1,
        mousewheel: false,
        keyboard: {
            enabled: true,
        },
        allowTouchMove: false,

        modules: [EffectFade],

        effect: "fade",

        on: {
            slideChangeTransitionStart: function () {
                isAnimating = true
            },
            slideChangeTransitionEnd: function () {
                isAnimating = false

                const lastSlide = horizontalNftSlider.slides.length - 1
                const isLastSlide = horizontalNftSlider.activeIndex === lastSlide

                if (isLastSlide) {
                    const lastSlideElement = horizontalNftSlider.slides[lastSlide]
                    lastSlideElement.classList.add('animated')

                    verticalSwiper.allowSlidePrev = false
                    verticalSwiper.allowSlideNext = true

                    horizontalSlider.allowSlidePrev = false
                    horizontalSlider.allowSlideNext = false

                    setTimeout(() => {
                        if (horizontalSlider.activeIndex !== lastSlide) {
                            verticalSwiper.slideNext()
                        } else {
                            verticalSwiper.allowSlidePrev = true
                            verticalSwiper.allowSlideNext = false

                            horizontalSlider.allowSlidePrev = true
                            horizontalSlider.allowSlideNext = true
                        }
                    }, 1000)
                }
            },
        },

        speed: 1000,
    })

    verticalSwiper.on('slideChange', () => {
        const header = document.querySelector('.header')
        const isFirstSlide = verticalSwiper.activeIndex === 0

        if (isFirstSlide) {
            header.classList.remove('removed')
        } else {
            header.classList.add('removed')
        }

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
        if (isAnimating) {
            return
        }

        const delta = Math.sign(e.deltaY)

        if (verticalSwiper.activeIndex === 1) {
            if (delta > 0) {
                horizontalSlider.slideNext()
            } else if (delta < 0) {
                horizontalSlider.slidePrev()
            }
        } else {
            if (delta > 0) {
                horizontalNftSlider.slideNext()
                verticalSwiper.slideNext()
            } else if (delta < 0) {
                horizontalNftSlider.slidePrev()
                verticalSwiper.slidePrev()
            }
        }
    })

    let touchStartY

    document.addEventListener('touchstart', (event) => {
        if (isAnimating) {
            return
        }

        touchStartY = event.touches[0].clientY
    })

    document.addEventListener('touchend', (event) => {
        const swipers = document.querySelectorAll('.swiper')
        if (isAnimating) {
            return
        }

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
