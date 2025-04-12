document.addEventListener('DOMContentLoaded', async()=>{
    const menuPlaceholder = document.getElementById('menu-placeholder')
    const slideBanner = document.getElementById('slide-banner')
    const brandsGrid = document.getElementById('Brands-grid')
    const noutatiGrid = document.getElementById('Noutati-grid')
    const upcomingGrid = document.getElementById('Upcoming-grid')
    const newsContainer = document.getElementById('News-container')
    const footerContainter = document.getElementById('Footer-information-container')

    
    const response = await fetch("/main_menu.html")
    //console.log(window.location.href)
    const main_menu_HTML = await response.text()
    menuPlaceholder.innerHTML = main_menu_HTML


    const main_menu_segments = document.querySelectorAll(".main_menu_segments")
    main_menu_segments.forEach(item => {
        item.style.gap = "20px";
    })

    function hideAllDropdowns() {
        const allDropdowns = document.querySelectorAll('.dropdown_info ul');
        allDropdowns.forEach(dropdown => {
            dropdown.classList.add('hide');
        });
        dropdown_area.classList.remove('show');
    }
    let dropdown_area_active = false
    let hoverTimeout;
    const listItems = document.querySelectorAll('.categorii li');
    const dropdown_area = document.querySelector('.dropdown_area')

    listItems.forEach(item => {
        const className = item.classList[0];
        const dropdown = document.querySelector(`.${className}_dropdown`);

        if(dropdown) {
            dropdown.classList.add('hide')
            item.addEventListener('mouseenter', ()=>{
                hoverTimeout = setTimeout(() => {
                    hideAllDropdowns()
                    dropdown_area.classList.add('show')
                    dropdown.classList.remove('hide')
                },300)  

                
            });
            item.addEventListener('mouseleave', () => {
                hoverTimeout = setTimeout(()=> {                
                    if(!dropdown_area.classList.contains('show') || dropdown_area_active === false)
                    {
                        dropdown.classList.add('hide');
                        dropdown_area.classList.remove('show')
                    }
                }, 300)
            });
 
            dropdown_area.addEventListener('mouseenter',()=>{
                dropdown_area_active = true
                if(!dropdown.classList.contains('hide'))
                {
                    dropdown_area.classList.add('show')
                    dropdown.classList.remove('hide')
                }
                
            })            

            dropdown_area.addEventListener('mouseleave',()=>{
                dropdown_area_active = false
                dropdown_area.classList.remove('show')
                dropdown.classList.add('hide')

            })

        }
    });

    const banner_slider = async()=> {
        const responseSliders = await fetch("/Main/HTML_routes/slider_banner.html")
        
        //console.log(window.location.href)
        const sliderBannerTEXT = await responseSliders.text()
        slideBanner.innerHTML = sliderBannerTEXT;
        const event = new Event('sliderContentLoaded')
        slideBanner.dispatchEvent(event)
    }
    await banner_slider()

    const brands_grid = async()=>{
        const responseBrands = await fetch("/Main/HTML_routes/brands_grid.html")
        const brandsGridTEXT = await responseBrands.text()
        brandsGrid.innerHTML = brandsGridTEXT
    }

    await brands_grid()



    const news_container = async() =>{
        const responseNewsContainter = await fetch("/Main/HTML_routes/news_container.html")
        const newsContainerTEXT = await responseNewsContainter.text()

        newsContainer.innerHTML = newsContainerTEXT
    }

    await news_container()

    

})




