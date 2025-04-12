/* BANNER-IMAGE SLIDER ///////////////////////////////*/ 
const slideBanner = document.getElementById("slide-banner")
let slides = []
let slideIndex = 0
let intervalId = null

if(!slideBanner)
{
    console.error("nu se incarca slide-banner") 
}

slideBanner.addEventListener('sliderContentLoaded',()=>{

    const testSlide = slideBanner.querySelector(".slider-banner-main")

    slides = testSlide.querySelectorAll(".slider-container img")

    if(slides.length>0)
    {
        initializeSlider()
    }
    else
    {
        console.error("nu gaseste imaginile")
    }
})


function initializeSlider()
{
    if(slides.length > 0)
    {
        slides[slideIndex].classList.add("displaySlide")
        intervalId=setInterval(nextSlide, 8000)
    }
}
function showSlide(index)
{
    if(index >= slides.length)
    {
        slideIndex = 0
    }
    else if(index < 0)
    {
        slideIndex = slides.length - 1
    }
    slides.forEach(slide => {
        slide.classList.remove("displaySlide")
    })
    slides[slideIndex].classList.add("displaySlide")
}

function prevSlide()
{
    clearInterval(intervalId)
    slideIndex--
    showSlide(slideIndex)
}

function nextSlide()
{
    clearInterval(intervalId)
    intervalId=setInterval(nextSlide, 8000)
    slideIndex++
    showSlide(slideIndex)
}



