import fullpage from 'fullpage.js'
import Swiper from 'swiper'
import {Pagination} from 'swiper/modules'

const
	LAST_SLOT_ANIMATION_DURATION	= 7500,
	SLIDE_TRANSITION_DURATION		= 900

let slotSwiper,
	slotSwiperLastSlide,
	swipedStart,
	swipedEnd

document.addEventListener('DOMContentLoaded', () => {
    'use strict'

    fullPageSettings()

    initSlotSwiper('.swiper.slot-swiper')
    initNftSwiper('.swiper.nft-swiper')
})

const fullPageSettings = () => {
    const header = document.querySelector('.header')
    const footer = document.querySelector('.footer')
    const mobileLinks = document.querySelector('.mobile__links')
    let slotSwiperAnimated = false

    new fullpage('#fullpage', {
        licenseKey: '9DMW8-YL9I9-IINYH-5PGM7-DFOSK',
        fitToSection: true,
        css3: true,
        anchors: ['firstPage', 'secondPage', '3rdPage'],
        menu: '#menu',

        afterLoad: function (origin, destination, direction) {
			switch( destination.index ){
				case 1:
					fullpage_api.setAllowScrolling(false)
					break
				case 2:
					fullpage_api.setAllowScrolling(false)
					break

				case 3:
					footer.classList.add('visible')
					break

				default:
					footer.classList.remove('visible')
			}

            if(footer.classList.contains('visible')) {
                mobileLinks.classList.add('hidden')
            } else mobileLinks.classList.remove('hidden')

            if(destination.index === 1) header.classList.add('removed')
            else header.classList.remove('removed')
        },

        onLeave: function (origin, destination, direction) {
            if (origin.index === 0 || origin.index === 2) {
                slotSwiper			= document.querySelector('.swiper.slot-swiper')
				slotSwiperLastSlide	= slotSwiper.querySelector('.swiper-slide:last-child')

                if (slotSwiperLastSlide) {
                    if (slotSwiperLastSlide.classList.contains('animated')) slotSwiperLastSlide.classList.remove('animated')

                    if (!slotSwiperLastSlide.classList.contains('closed')) slotSwiperLastSlide.classList.add('closed')

                    slotSwiperAnimated = false
                }
            }

            fullpage_api.setAllowScrolling(true)
        }
    })
}

const initSlotSwiper = (selector) => {
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

			// If this is the last slot - disable transition while animation is playing.
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

			// Swipe from bottom to top.
			if( direction === 'next' ) swiper.slideNext()
			else swiper.slidePrev()

			if( direction === 'prev' && swiper.activeIndex === 0 )
				setTimeout( () => fullpage_api.setAllowScrolling( true, direction === 'next' ? 'down' : 'up' ), SLIDE_TRANSITION_DURATION )
			else
				fullpage_api.setAllowScrolling(false)

			// If this is the last slot - disable transition while animation is playing.
			if( swiper.isEnd ) setTimeout( () => isTransitioning = false, LAST_SLOT_ANIMATION_DURATION )
			else setTimeout( () => isTransitioning = false, SLIDE_TRANSITION_DURATION )
		}
	})
}

const initNftSwiper = (selector) => {
    const swiper = new Swiper(selector, {
        direction: 'horizontal',
        slidesPerView: 1,
        spaceBetween: 20,
        speed: SLIDE_TRANSITION_DURATION,
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

            setTimeout(() => isTransitioning = false, SLIDE_TRANSITION_DURATION)

            if ((direction === 'next' && swiper.isEnd) || (direction === 'prev' && swiper.activeIndex === 0)) {
                setTimeout(() => fullpage_api.setAllowScrolling(true, direction === 'next' ? 'down' : 'up'), 500)
            } else {
                fullpage_api.setAllowScrolling(false)
            }
        }
    })
}
