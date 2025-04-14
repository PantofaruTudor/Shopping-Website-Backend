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
    const event = new Event('MenuContentLoaded')

    const banner_slider = async()=> {
        const responseSliders = await fetch("/Main/HTML_routes/slider_banner.html")
        const sliderBannerTEXT = await responseSliders.text()
        slideBanner.innerHTML = sliderBannerTEXT;
        slideBanner.dispatchEvent(event)
    }
    
    const brands_grid = async()=>{
        const responseBrands = await fetch("/Main/HTML_routes/brands_grid.html")
        const brandsGridTEXT = await responseBrands.text()
        brandsGrid.innerHTML = brandsGridTEXT
    }
    
    const news_container = async() =>{
        const responseNewsContainter = await fetch("/Main/HTML_routes/news_container.html")
        const newsContainerTEXT = await responseNewsContainter.text()
        newsContainer.innerHTML = newsContainerTEXT
        newsContainer.dispatchEvent(event)
        
    }


    //UPCOMING PRODUCTS GRID//////////////////////////////////////////////////////
    const upcoming_grid_function = async() =>{

        const releaseDate = new Date().getTime()
        const upcomingItems = await fetch("/Main/HTML_routes/upcoming_grid.html")
        const upcomingItemsTEXT = await upcomingItems.text()
        upcomingGrid.innerHTML = upcomingItemsTEXT
        const upcomingBorderGrid = upcomingGrid.querySelector(".upcoming-border-grid")
        const upcomingItemsGrid = upcomingBorderGrid.querySelector(".upcoming-item-grid")
        const {data:{products}} = await axios.get('/api/v1/products')

        const upcomingProducts = products.filter(item => item.upcoming).map((item)=>{
            const {brand,price,images} = item
            return `<div class="product-item-upcoming">
                <img class="main_image" src = ${images[0]}>
                <div class="item-favourite-name-box">
                    <h2>${brand}</h2>  
                    <div class="item-price-favourite-box">
                        <p id="full-price">${price}$</p>

                    </div>          
                </div> 
                </div>`
        }).join('')

        upcomingItemsGrid.innerHTML = upcomingProducts


        const upcomingProductsTimer = upcomingGrid.querySelectorAll('.upcoming-item-grid .product-item-upcoming')
        function UpcomingItemsTimer(){

            upcomingProductsTimer.forEach(item => {
                const productName = item.querySelector('h2').innerHTML
                const productIndex = products.findIndex(product => product.name === productName)
                const now = new Date().getTime()
                
                const releaseDate = new Date('2025-05-10T12:00:00').getTime()
                const remaining = releaseDate - now
                const days = Math.floor(remaining / (1000 * 60 * 60 *24))
                const hours = Math.floor((remaining % (1000 * 60 * 60 *24)) / (1000 * 60 * 60))
                const minutes = Math.floor((remaining % (1000 * 60 * 60 )) / (1000 * 60))
                const seconds = Math.floor((remaining % (1000 * 60 ))/ 1000)

                let timeLeftElement = item.querySelector('.upcoming_item_timer')
                if(timeLeftElement)
                    timeLeftElement.innerHTML = `${days}d ${hours}h ${minutes}m ${seconds}s`
                else{
                    timeLeftElement = document.createElement('div');
                    timeLeftElement.classList.add('upcoming_item_timer');
                    item.appendChild(timeLeftElement)
                    timeLeftElement.innerHTML = `${days}d ${hours}h ${minutes}m ${seconds}s`

                }
            })
        }

        UpcomingItemsTimer()
        setInterval(UpcomingItemsTimer, 1000)

       
        const upcoming_scroll_left = document.querySelector('.previous')
        const upcoming_scroll_right = document.querySelector('.upper')
        const upcomingGridScroll = document.querySelector('.upcoming-item-grid')
        const itemWidth = 400
        upcoming_scroll_right.addEventListener('click', () => {
            upcomingGridScroll.scrollBy({left: itemWidth , behavior: 'smooth'})
        })
        
        upcoming_scroll_left.addEventListener('click', () => {
            upcomingGridScroll.scrollBy({left: -itemWidth , behavior: 'smooth'})
        })
        
        if (upcomingGridScroll.scrollLeft === 0) {
            upcoming_scroll_left.style.display = 'none';
        } else {
            upcoming_scroll_left.style.display = 'block';
        }

    }
    ////////////////////////////////////////////////////////////////////////////


    // SALE&RECOMMENDED ITEMS GRID//////////////////////////////////////////////
    const sales_container = async()=>{
        const salesANDrecommended = await fetch('/Main/HTML_routes/noutati_grid.html')
        const salesANDrecommendedTEXT = await salesANDrecommended.text()
        noutatiGrid.innerHTML = salesANDrecommendedTEXT
        const {data:{products}} = await axios.get("/api/v1/products")
        const salesCounter = 10, noutatiCounter = 10


        const salesProducts = products.filter(item => item.sale).map((item) => {
            const {name,brand,price,images} = item
            return `<div class="product-item" data-images='${JSON.stringify(images)}'>
            <img class="main_image" src = ${images[0]}>
            <div class="item-favourite-name-box">
                <p>${brand}</p>
                <h2>${name}</h2>  
                <div class="item-price-favourite-box">
                    <p id="full-price">${price}$</p>
                    <button class="favourite-item">
                        <img src="../MainMenu/white_star.png" alt="favourite">
                    </button>
                </div>          
            </div> 
            </div>`
            }).join('')
        
        const salesItemGrid = noutatiGrid.querySelector(".sales-product-grid .items-grid")
        salesItemGrid.innerHTML = salesProducts




    }

    
        
    
    await banner_slider()
    await brands_grid()
    await sales_container()
    await upcoming_grid_function()
    await news_container()
})




