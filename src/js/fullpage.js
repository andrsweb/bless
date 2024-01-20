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
                fullpage_api.setAllowScrolling(false)
            } else if (destination.index > 2) {
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
}
