window.addEventListener('scroll', () => {
    let scrollPosition = window.scrollY;
    let slider = document.querySelector('.brands-slider');

    // Adjust the horizontal position based on scroll position
    if(window.innerWidth > 600)
        slider.style.transform = `translateX(-${scrollPosition}px)`;
    else{
        slider.style.transform = 'translateX(0)'
    }
});
