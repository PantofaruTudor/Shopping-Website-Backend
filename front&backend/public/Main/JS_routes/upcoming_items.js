const productsLength = products.length
const upcomingProdLength = products.filter(product => product.upcoming == true).length

const upcomingItems = document.querySelectorAll('.upcoming-item-grid .product-item')

function UpcomingItemsTimer(){

    upcomingItems.forEach(item => {
        const productName = item.querySelector('h2').innerHTML
        const productIndex = products.findIndex(product => product.name === productName)
        const now = new Date().getTime()
        
        const releaseDate = new Date(products[productIndex].release)
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
    
    

function next_upcoming_item(){
    const upcomingItemWidth = upcomingGrid.querySelector('.product-item').clientWidth
    upcomingGrid.scrollBy({left: upcomingItemWidth + 20, behavior: 'smooth'})
    console.log(upcomingItemWidth)
}

const upcoming_scroll_left = document.querySelector('.previous')
const upcoming_scroll_right = document.querySelector('.upper')
const upcomingGrid = document.querySelector('.upcoming-item-grid')
const itemWidth = 400
upcoming_scroll_right.addEventListener('click', () => {
    upcomingGrid.scrollBy({left: itemWidth , behavior: 'smooth'})
})

upcoming_scroll_left.addEventListener('click', () => {
    upcomingGrid.scrollBy({left: -itemWidth , behavior: 'smooth'})
})

if (upcomingGrid.scrollLeft === 0) {
    upcoming_scroll_left.style.display = 'none';
} else {
    upcoming_scroll_left.style.display = 'block';
}

news = [
    {title: 'Jacob & Co. and G-Dragon Celebrate South Korea Boutique Opening', 
        date: '2025-03-10T12:00:00', 
        image: 'news/news1.png'},
    {title: 'Avirex Celebrates 50th Anivversary With Limited-Edition Hellstar Collab', 
        date: '2025-03-12T12:00:00', 
        image: 'news/news2.png'},  
    {title: 'Moncler Genius x FRGMT Collection Reimagines Everyday Wear', 
        date: '2025-03-15T12:00:00',
        image: 'news/news3.png'},
    {title: 'Breaking Down Supreme SS25',
        date: '2025-03-10T12:00:00',
        image: 'news/news4.png'},
]

const newsGrid = document.querySelectorAll('.article-grid div')
newsGrid.forEach((article, index) => {
    const releaseDate = new Date(news[index].date)
    const daysAgo = Math.floor((new Date() - releaseDate) / (1000 * 60 * 60 * 24)) * (-1)
    article.innerHTML = `
        <img src=${news[index].image} alt=${news[index].title}>
        <div class="article-text">
            <h2 style="font-weight:300;">${news[index].title}</h2>
            <p>${daysAgo} days ago</p>
        </div>
    `
})