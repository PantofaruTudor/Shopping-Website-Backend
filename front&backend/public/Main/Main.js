document.addEventListener('DOMContentLoaded', async()=>{
    const slideBanner = document.getElementById('slide-banner')
    const brandsGrid = document.getElementById('Brands-grid')
    const noutatiGrid = document.getElementById('Noutati-grid')
    const upcomingGrid = document.getElementById('Upcoming-grid')
    const newsContainer = document.getElementById('News-container')
    const footerContainter = document.getElementById('Footer-information-container')

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
    
    const upcoming_grid_function = async(products) =>{
        
        const releaseDate = new Date().getTime()
        const upcomingItems = await fetch("/Main/HTML_routes/upcoming_grid.html")
        const upcomingItemsTEXT = await upcomingItems.text()
        upcomingGrid.innerHTML = upcomingItemsTEXT
        const upcomingBorderGrid = upcomingGrid.querySelector(".upcoming-border-grid")
        const upcomingItemsGrid = upcomingBorderGrid.querySelector(".upcoming-item-grid")
        
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
    const sales_container = async(products)=>{
        const sales = await fetch('/Main/HTML_routes/noutati_grid.html')
        const salesTEXT = await sales.text()
        noutatiGrid.innerHTML = salesTEXT
        //const {data:{products}} = await axios.get("/api/v1/products")
        const pageItemsCounter = 12
        
        const salePercent = 10
        
        const noutatiProducts = products.filter(item => !item.sale).slice(0,pageItemsCounter).map((item)=>{
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
        const noutatiItemGrid = noutatiGrid.querySelector(".noutati-product-grid .items-grid")
        noutatiItemGrid.innerHTML = noutatiProducts
        
        
        const salesProducts = products.filter(item => item.sale).slice(0,pageItemsCounter).map((item) => {
            const {name,brand,price,images} = item
            return `<div class="product-item" data-images='${JSON.stringify(images)}'>
            <img class="main_image" src = ${images[0]}>
            <div class="item-favourite-name-box">
            <p>${brand}</p>
            <h2>${name}</h2>  
            <div class="item-price-favourite-box">
            <p id="full-price">${price}$</p>
            <p id="sale-price">${(price-(price*(1/salePercent))).toFixed(1)}$</p>
            <button class="favourite-item">
            <img src="../MainMenu/white_star.png" alt="favourite">
            </button>
            </div>          
            </div> 
            </div>`
        }).join('')
        
        const salesItemGrid = noutatiGrid.querySelector(".sales-product-grid .items-grid")
        salesItemGrid.innerHTML = salesProducts
        
        const addHoverEffect = () => {
            const productItems = document.querySelectorAll('.product-item');
            
            productItems.forEach((item) => {
                const imageElement = item.querySelector('.main_image');
                const images = JSON.parse(item.getAttribute('data-images')); // Parse the images array from the data attribute
                
                // On hover, change to the second image if available
                imageElement.addEventListener('mouseenter', () => {
                    if (images && images.length > 1) {
                        imageElement.src = images[1]; // Change to the second image
                    }
                });
                
                // On mouse leave, revert to the first image
                imageElement.addEventListener('mouseleave', () => {
                    if (images && images.length > 0) {
                        imageElement.src = images[0]; // Revert to the first image
                    }
                });
            });
        };
        
        addHoverEffect()
    }
    
    const {data:{products}} = await axios.get('/api/v1/products')
    
    await banner_slider()
    await brands_grid()
    await sales_container(products)
    await upcoming_grid_function(products)
    await news_container()
})




