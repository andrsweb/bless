import fullpage from 'fullpage.js'
import Swiper from 'swiper'

document.addEventListener('DOMContentLoaded', () => {
    'use strict'

    fullPageSettings()
    initSwiper('.swiper.slot-swiper')
    initSwiper('.swiper.nft-swiper')
})

const fullPageSettings = () => {
    const header = document.querySelector('.header')

    new fullpage('#fullpage', {
        licenseKey: '9DMW8-YL9I9-IINYH-5PGM7-DFOSK',
        fitToSection: true,
        css3: true,
        anchors: ['firstSection', 'secondSection', 'thirdSection', 'fourthSection'],
        menu: '#menu',

        afterLoad: function (origin, destination, direction) {
            if (destination.index === 1) {
                fullpage_api.setAllowScrolling(false)
                header.classList.add('removed')
            } else if (destination.index === 0) {
                header.classList.remove('removed')
            }

            if (destination.index === 2) {
                fullpage_api.setAllowScrolling(false)
            }
        }
    })
}

const initSwiper = (selector) => {
    const swiper = new Swiper(selector, {
        slidesPerView: 1,
        spaceBetween: 20,
        speed: 1200,
    })

    let isTransitioning = false

    swiper.on('slideChangeTransitionEnd', () => {
        updateAnimatedClass(swiper)
    })

    document.querySelector(selector).addEventListener('wheel', (e) => {
        if (isTransitioning) {
            return
        }

        const delta = e.deltaY
        const isScrollingDown = delta > 0

        if ((isScrollingDown && swiper.isEnd) || (!isScrollingDown && swiper.isBeginning)) {
            fullpage_api.setAllowScrolling(true, isScrollingDown ? 'down' : 'up')
        } else {
            fullpage_api.setAllowScrolling(false)
        }

        isTransitioning = true

        isScrollingDown ? swiper.slideNext() : swiper.slidePrev()
    })

    swiper.on('transitionEnd', () => {
        fullpage_api.setAllowScrolling(true)
        isTransitioning = false
        updateAnimatedClass(swiper)
    })

    const updateAnimatedClass = (swiperInstance) => {
        swiperInstance.slides.forEach((slide, index) => {
            const isLastSlide = index === swiperInstance.slides.length - 1
            if (isLastSlide && swiperInstance.isEnd) {
                slide.classList.add('animated')
            } else {
                slide.classList.remove('animated')
            }
        })
    }
}
