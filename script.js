/* heading text animation */

gsap.registerPlugin(ScrollTrigger);

gsap.to('.headingName', {
    scrollTrigger:{
        trigger: '.section-1',
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
    'yellow':{
        barColor: '#dfeb00'
    },
};

const themeChoice = Math.floor(Math.random() * Object.keys(themes).length);
const themeChoiceName = Object.keys(themes)[themeChoice];
const barColourChoosen = themes[themeChoiceName].barColor;

document.querySelector(':root').style.setProperty('--barcolor', barColourChoosen);

gsap.to('.sideBanner>span', {
    scrollTrigger:{
        trigger: 'body',
        toggleActions: 'play pause none none',
        scrub: 2,
        start: 'top top'
    },
    y: '100px',
    duration: 20
});