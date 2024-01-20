import fullpage from 'fullpage.js'
import Swiper from 'swiper'

document.addEventListener('DOMContentLoaded', () => {
    'use strict'

    fullPageSettings()

    initSlotSwiper('.swiper.slot-swiper')
    initNftSwiper('.swiper.nft-swiper')
})

const fullPageSettings = () => {
    const header = document.querySelector('.header')
    const footer = document.querySelector('.footer')
    let slotSwiperAnimated = false

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

            if (destination.index === 3) {
                footer.classList.add('visible')
            } else footer.classList.remove('visible')
        },

        onLeave: function (origin, destination, direction) {
            if (origin.index === 0 || origin.index === 2) {
                const slotSwiper = document.querySelector('.swiper.slot-swiper')
                const lastSlide = slotSwiper.querySelector('.swiper-slide:last-child')

                if (lastSlide) {
                    if (lastSlide.classList.contains('animated')) {
                        lastSlide.classList.remove('animated')
                    }

                    if (!lastSlide.classList.contains('closed')) {
                        lastSlide.classList.add('closed')
                    }

                    slotSwiperAnimated = false
                }
            }
            fullpage_api.setAllowScrolling(true)
        }
    })
}

const initNftSwiper = (selector) => {
    const swiper = new Swiper(selector, {
        direction: 'horizontal',
        slidesPerView: 1,
        spaceBetween: 20,
        speed: 900,
    })

    let isTransitioning = false

    swiper.el.addEventListener('wheel', e => {
        const direction = e.deltaY > 0 ? 'next' : 'prev'

        if (!isTransitioning) {
            isTransitioning = true

            if (direction === 'next') {
                swiper.slideNext()
            } else {
                swiper.slidePrev()
            }

            setTimeout(() => isTransitioning = false, 900)

            if ((direction === 'next' && swiper.isEnd) || (direction === 'prev' && swiper.activeIndex === 0)) {
                setTimeout(() => fullpage_api.setAllowScrolling(true, direction === 'next' ? 'down' : 'up'), 500)
            } else {
                fullpage_api.setAllowScrolling(false)
            }
        }
    })
}

const initSlotSwiper = (selector) => {
    const swiper = new Swiper(selector, {
        direction: 'horizontal',
        slidesPerView: 1,
        spaceBetween: 20,
        speed: 900,

        on: {
            slideChange: () => {
                const prevSlide = swiper.slides[swiper.previousIndex]
                const lastSlide = swiper.slides[swiper.slides.length - 1]
                const isLastSlideActive = swiper.isEnd && swiper.activeIndex === swiper.slides.length - 1

                if (prevSlide) {
                    prevSlide.classList.remove('animated')
                }

                if (isLastSlideActive) {
                    lastSlide.classList.remove('closed')
                    lastSlide.classList.add('animated')
                    fullpage_api.setAllowScrolling(false) // не отрабатывает сука
                    setTimeout(() => fullpage_api.moveSectionDown(), 7500) 
                }
            }
        }
    })

    let isTransitioning = false

    swiper.el.addEventListener('wheel', e => {
        const direction = e.deltaY > 0 ? 'next' : 'prev'

        if (!isTransitioning) {
            isTransitioning = true

            if (direction === 'next') {
                swiper.slideNext()
            } else {
                swiper.slidePrev()
            }

            setTimeout(() => isTransitioning = false, 900)

            if ((direction === 'next' && swiper.isEnd) || (direction === 'prev' && swiper.activeIndex === 0)) {
                setTimeout(() => fullpage_api.setAllowScrolling(true, direction === 'next' ? 'down' : 'up'), 900)
            } else {
                fullpage_api.setAllowScrolling(false)
            }

            if(direction === 'next' && swiper.isEnd || direction === 'prev' && swiper.isEnd) {
                setTimeout(() => fullpage_api.setAllowScrolling(true, direction === 'next' ? 'down' : 'up'), 6000)
            }
        }
    })
}
