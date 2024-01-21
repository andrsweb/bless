document.addEventListener('DOMContentLoaded', () => {
    'use strict'

    followCursor()
})

const followCursor = () => {
    const marker = document.getElementById('marker')
    const current = document.querySelector('.current')
    const listItems = document.querySelectorAll('.menu-item')
    const ul = document.querySelector('.header__nav')

    if(!marker && !current || !listItems.length && !ul) return

    marker.style.bottom = `-${marker.offsetHeight / 2}px`
    marker.style.left = `${current.offsetLeft}px`
    marker.style.width = `${current.offsetWidth}px`
    marker.style.display = 'block'

    listItems.forEach(item => {
        item.addEventListener('mouseover', () => {
            const offsetLeft = item.offsetLeft
            const width = item.offsetWidth || current.offsetWidth
            const left = offsetLeft === 0 ? 0 : offsetLeft || current.offsetLeft
            marker.style.left = `${left}px`
            marker.style.width = `${width}px`
        })
    })

    ul.addEventListener('mouseenter', () => {
        marker.style.opacity = 1
    })

    ul.addEventListener('mouseleave', () => {
       marker.style.opacity = 0
    })
}




