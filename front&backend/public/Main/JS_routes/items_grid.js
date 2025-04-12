const products = [
    {brand: 'Barbour', name: 'Leather Wax Jacket', price: 100, image: ["items/item1.jpg", "items/item2.jpg"], sale: true},
    {brand: 'Carhartt', name: 'Cuban Keychain', price: 50, image: ['items/item2.jpg', 'items/item3.jpg'], sale: false},
    {brand: 'Carhartt', name: 'Basic Shirt', price: 200, image: ['items/item3.jpg', 'items/item4.jpg'], sale: true},
    {brand: 'Maison-Mihara', name: 'Low-Top Sneakers', price: 150, image: ['items/item4.jpg', 'items/item5.jpg'], sale: false},
    {brand: "Levi's", name: 'Pattern Jeans', price: 75, image: ['items/item5.jpg', 'items/item6.jpg'], sale: true},
    {brand: "Levi's", name: 'Baggy Jeans', price: 100, image: ['items/item6.jpg', 'items/item7.jpg'], sale: false},
    {brand: 'Adidas', name: "Samba 00's", price: 50, image: ['items/item7.jpg', 'items/item8.jpg'], sale: true},
    {brand: 'Carhartt', name: 'Denim Jacket', price: 25, image: ['items/item8.jpg', 'items/item9.jpg'], sale: false},
    {brand: 'Undercover', name: 'Distressed Cap', price: 75, image: ['items/item9.jpg', 'items/item10.jpg'], sale: true},
    {brand: 'Asics', name: 'Running Shoes', price: 100, image: ['items/item10.jpg', 'items/item11.jpg'], sale: false}, 
    {brand: 'Hoka', name: 'Runnning Shoes', price: 100, image: ["items/item11.jpg", "items/item12.jpg"], sale: true},   
    {brand: 'Kenzo', name: 'Soft Cardigan', price: 50, image: ['items/item12.jpg', 'items/item13.jpg'], sale: false},
    {brand: 'Adidas', name: 'jacket', price: 200, image: ['items/item13.jpg', 'items/item14.jpg'], sale: true},
    {brand: 'Nike', name: 'shoes', price: 150, image: ['items/item14.jpg', 'items/item15.jpg'], sale: false},
    {brand: 'Rick-Owens', name: 'Sneakers', price: 75, image: ['items/item15.jpg', 'items/item16.jpg'], sale: true},
    {brand: 'Reebok', name: 't-shirt', price: 100, image: ['items/item16.jpg', 'items/item17.jpg'], sale: false},
    {brand: 'Adidas', name: 'Running Shoes', price: 50, image: ['items/item17.jpg', 'items/item18.jpg'], sale: true},
    {brand: 'New-Balance', name: 'hat', price: 100, image: ['items/item18.jpg', 'items/item19.jpg'], sale: false},
    {brand: 'Vans', name: 'shoes', price: 50, image: ['items/item19.jpg', 'items/item20.jpg'], sale: true},
    {brand: 'Converse', name: 'jacket', price: 25, image: ['items/item20.jpg', 'items/item1.jpg'], sale: false},

    {brand: 'Aries', name: '2096 longsleeve', price: 100, image: ["items/upcoming1.jpg"], upcoming: true, sale:false, release:'2025-03-10T12:00:00'},
    {brand: 'Taurus', name: 'shirt', price: 50, image: ['items/upcoming2.jpg'] , upcoming: true, sale:false, release:'2025-03-12T12:00:00'},
    {brand: 'Rick Owens', name: 'hoodie', price: 200, image: ['items/upcoming3.jpg'] , upcoming: true , sale:false, release:'2025-03-15T12:00:00'},
    {brand: 'Gucci', name: 'pants', price: 150, image: ['items/upcoming4.jpg'] , upcoming: true , sale:false, release:'2025-03-10T12:00:00'},
    {brand: 'Prada', name: 't-shirt', price: 75, image: ['items/upcoming5.jpg'] , upcoming: true , sale:false, release:'2025-03-10T12:00:00'},
    {brand: 'Rick Owens', name: 'jacket', price: 100, image: ['items/upcoming6.jpg'], upcoming: true ,sale:false, release:'2025-03-10T12:00:00'},
    {brand: 'Aries', name: 'shirt', price: 50, image: ['items/upcoming7.jpg'], upcoming: true , sale:false, release:'2025-03-10T12:00:00'},
    {brand: 'Gucci', name: 'jacket', price: 25, image: ['items/upcoming8.jpg'], upcoming: true, sale:false, release:'2025-03-10T12:00:00'},
];
const productGrid = document.querySelector('.noutati-item-grid')
const SalesProductGrid = document.querySelector('.sales-item-grid')
const upcomingProductGrid = document.querySelector('.upcoming-item-grid')
products.forEach(product => {
    const productItem = document.createElement('div')
    productItem.className = "product-item"
    productItem.innerHTML = `
        <a href="https://www.lego.com/ro-ro"></a>
        <img class="main_image" src=${product.image[0]} alt=${product.name}>
        
        <div class="item-favourite-name-box">
            <p>${product.brand}</p>
            <h2>${product.name}</h2>
            <div class="item-price-favourite-box">
                <div class="item-price">
                    <p id="full-price">${product.price}$</p>
                </div>
                <button class="favourite-item">
                    <img src="MainMenu/white_star.png" alt="favourite">
                </button>
            </div>
        </div>
    `

    if(product.sale == true){
        const productItemDiv = productItem.querySelector('.item-price')
        productItemDiv.innerHTML += `<p style="color: red">${Math.floor(product.price - 0.3*product.price)}$</p>`
        SalesProductGrid.appendChild(productItem)
    }
    else if(product.upcoming == true)
        upcomingProductGrid.appendChild(productItem)
    else
        productGrid.appendChild(productItem)
})




const allProducts = document.querySelectorAll('.product-item .main_image')
allProducts.forEach(product => {
    const productItem = product.closest('.product-item')
    const isInSalesGrid = productItem.closest('.sales-item-grid') !== null
    const isInProductGrid = productItem.closest('.noutati-item-grid') !== null
    const productIndex_noutati = Array.from(productGrid.children).indexOf(productItem)
    const productIndex_sales = Array.from(SalesProductGrid.children).indexOf(productItem)
    const productIndex= products.findIndex(product => product.name === productItem.querySelector('h2').innerHTML)
    product.addEventListener('mouseenter', () => {
        if(isInSalesGrid)
            product.src = products[productIndex].image[1]
        else if(isInProductGrid){
            product.src = products[productIndex].image[1]
        }
    })
    product.addEventListener('mouseleave', () => {
        if(isInSalesGrid)
            product.src = products[productIndex].image[0]
        else if(isInProductGrid)
            product.src = products[productIndex].image[0]
    })
})
