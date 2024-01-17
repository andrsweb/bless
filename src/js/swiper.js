import Swiper from "swiper"

document.addEventListener('DOMContentLoaded', () => {
    'use strict'

    sectionsScroll('.sections-scroll')
})

const sectionsScroll = (selector) => {
    let isAnimating = false

    if(!selector) return

    const swiper = new Swiper(selector, {

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

        speed: 3000
    })

    document.addEventListener('wheel', (event) => {
        if (isAnimating) {
            return
        }

        const delta = Math.sign(event.deltaY)

        if (delta > 0) {
            swiper.slideNext()
        } else if (delta < 0) {
            swiper.slidePrev()
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
        if (isAnimating) {
            return
        }

        const touchEndY = event.changedTouches[0].clientY
        const deltaY = touchEndY - touchStartY

        if (deltaY > 50) {
            swiper.slidePrev()
        } else if (deltaY < -50) {
            swiper.slideNext()
        }
    })
}
