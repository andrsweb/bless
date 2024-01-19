import fullpage from 'fullpage.js'
import Swiper from 'swiper'

document.addEventListener('DOMContentLoaded', () => {
    'use strict'

    fullPageSettings()
    initSwiper('.swiper.slot-swiper')
    initSwiper('.swiper.nft-swiper')
})

const fullPageSettings = () => {
    new fullpage('#fullpage', {
        licenseKey: '9DMW8-YL9I9-IINYH-5PGM7-DFOSK',
        fitToSection: true,
        css3: true,
        anchors: ['firstSection', 'secondSection', 'thirdSection', 'fourthSection'],
        menu: '#menu',

        afterLoad: function (origin, destination, direction) {
            if (destination.index === 1) {
                fullpage_api.setAllowScrolling(false)
            } else {
                fullpage_api.setAllowScrolling(true)
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
        if (swiper.isEnd) {
            setTimeout(() => {
                fullpage_api.setAllowScrolling(true, 'down')
                document.querySelector(selector).classList.add('animated')
            }, 1200)
        } else {
            document.querySelector(selector).classList.remove('animated')
        }
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

        setTimeout(() => {
            fullpage_api.setAllowScrolling(true)
            isTransitioning = false
        }, 1200)
    })
}
