import fullpage from 'fullpage.js'
import Swiper from 'swiper'
import {Pagination} from 'swiper/modules'

const
	LAST_SLOT_ANIMATION_DURATION	= 8000,
	SLIDE_TRANSITION_DURATION		= 900

let 
	swipedStart,
	swipedEnd

document.addEventListener('DOMContentLoaded', () => {
    'use strict'

    fullPageSettings()

    initSlotSwiper('.swiper.slot-swiper')
    initNftSwiper('.swiper.nft-swiper')
})

const fullPageSettings = () => {
    const fullpageWrapper = document.querySelector('.fullpage__wrapper')
    const header = document.querySelector('.header')
    const footer = document.querySelector('.footer')
    const mobileLinks = document.querySelector('.mobile__links')
    let slotSwiperAnimated = false

    if(!fullpageWrapper) return

    new fullpage('#fullpage', {
        licenseKey: '9DMW8-YL9I9-IINYH-5PGM7-DFOSK',
        css3: true,
        anchors: ['firstPage', 'secondPage', '3rdPage', 'lastPage'],
        menu: '#menu',
        fitToSection: false,

        afterLoad: function (origin, destination, direction) {
            if(destination.index === 1) {
                fullpage_api.setAllowScrolling(false)
                footer.classList.remove('visible')
                header.classList.add('removed')
            } else {
                header.classList.remove('removed')
            }

            if(destination.index === 2) {
                fullpage_api.setAllowScrolling(false)
            }

            if(destination.index === 4) {
                footer.classList.add('visible')
            }

            if(footer.classList.contains('visible')) {
                mobileLinks.classList.add('hidden')
            } else mobileLinks.classList.remove('hidden')
        },

        onLeave: function (origin, destination, direction) {
            fullpage_api.setAllowScrolling(true)

            if(destination.index === 3) {
                footer.classList.add('visible')
            } else footer.classList.remove('visible')
        }
    })
}

const initSlotSwiper = (selector) => {
    const swiperWrapper = document.querySelector(selector)

    if(!swiperWrapper) return

	const swiper = new Swiper(selector, {
		direction: 'horizontal',
		slidesPerView: 1,
		spaceBetween: 20,
		speed: SLIDE_TRANSITION_DURATION,
		allowTouchMove: false,
        modules: [Pagination],

        pagination: {
            el: '.swiper-pagination',
            clickable: true
          },

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
					fullpage_api.setAllowScrolling(false)

					setTimeout(() => {
						fullpage_api.moveSectionDown()
						lastSlide.classList.remove('animated')
						lastSlide.classList.add('closed')
                        
					}, LAST_SLOT_ANIMATION_DURATION)
				}
			}
		}
	})
	let isTransitioning = false

	swiper.el.addEventListener('wheel', e => {
        e.preventDefault()
        if(!swiper.el) return
		const direction = e.deltaY > 0 ? 'next' : 'prev'

		if (!isTransitioning) {
			isTransitioning = true

			if (direction === 'next') {
				swiper.slideNext()
			} else {
				swiper.slidePrev()
			}

			if( direction === 'prev' && swiper.activeIndex === 0 ){
				setTimeout( () => fullpage_api.setAllowScrolling( true, direction === 'next' ? 'down' : 'up' ), SLIDE_TRANSITION_DURATION )
			}else{
				fullpage_api.setAllowScrolling(false)
			}

			if( swiper.isEnd ) setTimeout( () => isTransitioning = false, LAST_SLOT_ANIMATION_DURATION )
			else setTimeout( () => isTransitioning = false, SLIDE_TRANSITION_DURATION )
		}
	})

	swiper.el.addEventListener('touchstart', e => swipedStart = e.changedTouches[0].clientY )
	swiper.el.addEventListener('touchend', e => {
		swipedEnd = e.changedTouches[0].clientY

		const direction = swipedEnd < swipedStart ? 'next' : 'prev'

		if (!isTransitioning) {
			isTransitioning = true

			if( direction === 'next' ) swiper.slideNext()
			else swiper.slidePrev()

			if( direction === 'prev' && swiper.activeIndex === 0 )
				setTimeout( () => fullpage_api.setAllowScrolling( true, direction === 'next' ? 'down' : 'up' ), SLIDE_TRANSITION_DURATION )
			else
				fullpage_api.setAllowScrolling(false)

			if( swiper.isEnd ) setTimeout( () => isTransitioning = false, LAST_SLOT_ANIMATION_DURATION )
			else setTimeout( () => isTransitioning = false, SLIDE_TRANSITION_DURATION )
		}
	})
}

const initNftSwiper = (selector) => {
    const swiperWrapper = document.querySelector(selector)

    if(!swiperWrapper) return

    const swiper = new Swiper(selector, {
        direction: 'horizontal',
        slidesPerView: 1,
        spaceBetween: 20,
        speed: SLIDE_TRANSITION_DURATION,
    })

    let isTransitioning = false
    let touchStartY = 0
    let touchEndY = 0

    swiper.el.addEventListener('wheel', e => {
        e.preventDefault()
        const direction = e.deltaY > 0 ? 'next' : 'prev'

        if (!isTransitioning) {
            isTransitioning = true

            if (direction === 'next') {
                swiper.slideNext()
            } else {
                swiper.slidePrev()
            }

            setTimeout(() => isTransitioning = false, SLIDE_TRANSITION_DURATION)

            if ((direction === 'next' && swiper.isEnd) || (direction === 'prev' && swiper.activeIndex === 0)) {
                setTimeout(() => fullpage_api.setAllowScrolling(true, direction === 'next' ? 'down' : 'up'), 900)
            } else {
                fullpage_api.setAllowScrolling(false)
            }
        }
    })

    swiper.el.addEventListener('touchstart', e => {
        touchStartY = e.touches[0].clientY
    })

    swiper.el.addEventListener('touchmove', e => {
        touchEndY = e.touches[0].clientY
    })

    swiper.el.addEventListener('touchend', () => {
        const direction = touchEndY > touchStartY ? 'prev' : 'next'

        if (!isTransitioning) {
            isTransitioning = true

            if (direction === 'next') {
                swiper.slideNext()
            } else {
                swiper.slidePrev()
            }

            setTimeout(() => isTransitioning = false, SLIDE_TRANSITION_DURATION)

            if ((direction === 'next' && swiper.isEnd) || (direction === 'prev' && swiper.activeIndex === 0)) {
                setTimeout(() => fullpage_api.setAllowScrolling(true, direction === 'next' ? 'down' : 'up'), 900)
            } else {
                fullpage_api.setAllowScrolling(false)
            }
        }
    })
}


