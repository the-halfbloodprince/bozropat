/* heading text animation */

gsap.registerPlugin(ScrollTrigger);

// const locoScroll = new LocomotiveScroll({
//     el: document.querySelector('[data-scroll-container]'),
//     smooth: true
// });

// locoScroll.on('scroll', ScrollTrigger.update)

// ScrollTrigger.scrollerProxy("[data-scroll-container]", {
//     scrollTop(value) {
//       return arguments.length ? locoScroll.scrollTo(value, 0, 0) : locoScroll.scroll.instance.scroll.y
//     },
//     getBoundingClientRect() {
//         return {top: 0, left: 0, width: window.innerWidth, height: window.innerHeight};
//     },
//     pinType: document.querySelector("[data-scroll-container]").style.transform ? "transform" : "fixed"
// })

gsap.to('.headingName', {
    scrollTrigger:{
        trigger: '.section-1',
        // scroller: '[data-scroll-container]',
        toggleActions: 'play pause none none',
        scrub: 2,
        start: 'top top',
        pin: '.section-1'
    },
    x: '-28%',
    duration: 1
});

/* scroll-left animation */

/* $(document).scroll(function(){

    let scroll = $(window).scrollTop();

    $(".sideBanner>span").css({
        top: - (scroll*0.1) + '%'
    });

}) */

const themes = {
    'blue':{
        barColor: '#00eeff'
    },
    'green':{
        barColor: '#81eb00'
    },
    'red':{
        barColor: '#eb4700'
    },
    // 'yellow':{
    //     barColor: '#dfeb00'
    // },
};

const themeChoice = Math.floor(Math.random() * Object.keys(themes).length);
const themeChoiceName = Object.keys(themes)[themeChoice];
const barColourChoosen = themes[themeChoiceName].barColor;

// document.querySelector(':root').style.setProperty('--barcolor', barColourChoosen);
// document.querySelector(':root').style.setProperty('--barcolorop66', `#${barColourChoosen}66`);
console.log(barColourChoosen+'66')
// document.querySelector(':root').style.setProperty('--barcolor', '#6a26cd');

gsap.to('.sideBanner>span', {
    scrollTrigger:{
        trigger: 'body',
        // scroller: '[data-scroll-container]',
        toggleActions: 'play pause none none',
        scrub: 2,
        start: 'top top'
    },
    y: '100px',
    duration: 20
});

// ScrollTrigger.addEventListener("refresh", () => locoScroll.update())
// ScrollTrigger.refresh()