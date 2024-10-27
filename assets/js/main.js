
//element variable
const hero_image = document.querySelector('#hero--image')
const hero_text = document.querySelector('#hero--text')
const hero_button = document.querySelector('#hero--button')
const navbar_open_menu_button = document.querySelector('#open--menu--button')
const navbar_open_menu_icon = document.querySelector('#open--menu--icon')
const navbar_close_menu_icon = document.querySelector('#close--menu--icon')
const navbar = document.querySelector('nav')
const navbar_menu_container = document.querySelector('#navbar--menu--container')
const heading_text_content = document.querySelector('#heading--text--content--fleanab')
const hero_container = document.querySelector('#home')
const content_container = document.querySelector('#content')
const content1_container = document.querySelector('#content1--container')
const content2_container = document.querySelector('#content2--container')
const content3_container = document.querySelector('#content3--container')
const content4_container = document.querySelector('#content4--container')
const content5_container = document.querySelector('#content5--container')
const content6_container = document.querySelector('#content6--container')
const content7_container = document.querySelector('#content7--container')

//conditional variable
let is_menu_open = false
let scrollY = 0

//scroll behaviour
document.addEventListener('scroll', (e) => {
    scrollY = window.scrollY
    
    hero_image.style.top = `${scrollY * .2}px`
    hero_text.style.left = `${scrollY * .4}px`
    if(screen.width <= 639){
        heading_text_content.style.left = scrollCalculate(.4, content_container.offsetTop - 100)
        let offsetTop = content_container.offsetTop
        content1_container.style.right = scrollCalculate(.2,  offsetTop)
        offsetTop += content2_container.offsetHeight
        content2_container.style.left = scrollCalculate(.2, offsetTop)
        offsetTop += content3_container.offsetHeight
        content3_container.style.right = scrollCalculate(.2, offsetTop)
        offsetTop += content4_container.offsetHeight
        content4_container.style.left = scrollCalculate(.2, offsetTop)
        offsetTop += content5_container.offsetHeight
        content5_container.style.right = scrollCalculate(.2, offsetTop)
        offsetTop += content6_container.offsetHeight
        content6_container.style.left = scrollCalculate(.2, offsetTop)
        offsetTop += content7_container.offsetHeight
        content7_container.style.right = scrollCalculate(.2, offsetTop)
    }
    if(scrollY > 0){
        navbar.classList.add('bg-[#729762]', 'text-white', 'shadow-md')
    } else {
        navbar.classList.remove('bg-[#729762]', 'text-white', 'shadow-md')
    }

    if(scrollY >= content_container.offsetTop){
        hero_image.style.display = 'none'
        hero_text.style.display = 'none'
    } else {
        hero_image.style.display = 'block'
        hero_text.style.display = 'block'
    }
})

//container teleporter
hero_button.addEventListener('click', (e) => {
    window.scrollTo({top: content_container.offsetTop, left: 0, behavior: 'smooth'})
})

//navbar main meu
navbar_open_menu_button.addEventListener('click', (e) => {
    if(is_menu_open){
        closeNavbarMenu()
    } else {
        openNavbarMenu()
    }
})

//calculate the scroll
function scrollCalculate(delay, target_offset_top){
    return (((scrollY - target_offset_top) * delay) <= 0) ? `${((scrollY - target_offset_top) * delay)}px` : '0px'
}

//observer
const options = {
    root: null,
    threshold: 0,
    rootMargin: '150px 0px -150px 0px'
}
const observer_content = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
        if(entry.isIntersecting){
            entry.target.querySelector('.content-header').style.opacity = 1
            entry.target.querySelector('.content-description').style.opacity = 1
            headingShowing(entry.target.querySelector('.content-header-texts'))
            descriptionShow(entry.target.querySelector('.content-description-texts'))
        } else {
            entry.target.querySelector('.content-header').style.opacity = 0
            entry.target.querySelector('.content-description').style.opacity = 0
        }
    })
}, options)

document.querySelectorAll('.content-container').forEach((ele) => {
    if(ele){
        observer_content.observe(ele)
    }
})

//anime.js
function headingShowing(text_wrapper){
    text_wrapper.innerHTML = text_wrapper.textContent.replace(/\S/g, "<span class='content-header-text leading-[1em]'>$&</span>")
    anime.timeline()
        .add({
            targets: text_wrapper.parentNode.parentNode.querySelectorAll('.content-header-text'),
            translateY: ['1.1em', 0],
            translateZ: 0,
            duration: 750,
            delay: (el, i) => 50 * i
        })
}

function descriptionShow(text_wrapper){
    text_wrapper.innerHTML = text_wrapper.textContent.replace(/\S/g, "<span class='content-description-text origin-[50%_100%] leading-[1em]'>$&</span>")
    anime.timeline()
        .add({
            targets: text_wrapper.parentNode.parentNode.querySelectorAll('.content-description-text'),
            scale: [0, 1],
            duration: 500,
            elasticity: 600,
            delay: (el, i) => 10 * (i+1)
        })
}

function openNavbarMenu(){
    navbar_open_menu_icon.classList.add('hidden')
    navbar_close_menu_icon.classList.remove('hidden')
    navbar_close_menu_icon.querySelectorAll('animate').forEach(ele => {
        ele.beginElement()
    })
    navbar_menu_container.classList.remove('hidden')
    anime({
        targets: navbar_menu_container,
        opacity: 1,
        translateY: 0,
        duration: 500,
        easing: 'linear'
    })
    is_menu_open = true
}

function closeNavbarMenu(){
    anime({
        targets: navbar_menu_container,
        opacity: 0,
        translateY: -250,
        duration: 500,
        easing: 'linear',
        complete: () => {
            navbar_menu_container.classList.add('hidden')
        },
    })
    navbar_close_menu_icon.classList.add('hidden')
    navbar_open_menu_icon.classList.remove('hidden')
    navbar_open_menu_icon.querySelectorAll('animate').forEach(ele => {
        ele.beginElement()
    })
    is_menu_open = false
}

document.querySelectorAll('.nav-link').forEach((ele) => {
    ele.addEventListener('click', (e) => {
        e.preventDefault()
        closeNavbarMenu()
        if(e.target.innerHTML == 'Content'){
            window.scrollTo({top: content_container.offsetTop, left: 0, behavior: 'smooth'})
        } else {
            window.scrollTo({top: hero_container.offsetTop, left: 0, behavior: 'smooth'})
        }
    })
})