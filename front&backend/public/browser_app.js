const itemsGrid = document.querySelector('.items-grid')
const itemList = document.querySelector('.items-list')

document.addEventListener('DOMContentLoaded', async()=>{
    const menuPlaceholder = document.getElementById('menu-placeholder')
    const response = await fetch("main_menu.html")
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

})


/* DROPDOWN-MENU //////////////////////////////////////////////////////*/
document.addEventListener('DOMContentLoaded', () => {
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
});






////////////////////////////////////////////////////////
//AICI SUNT TOATE CATEGORIILE DE FILTRE
function toggleDropdown(dropdownId){
    existingTab = document.getElementById(`${dropdownId}`)
    if(existingTab){
        console.log(existingTab)
        existingTab.remove()
        return
    }
    const filterTab = document.createElement('div')
    filterTab.id = dropdownId
    filterTab.classList.add('filter-wrapper')
    const prevFilter = document.querySelector(`[onclick="toggleDropdown('${dropdownId}')"]`) 
    prevFilter.insertAdjacentElement("afterend",filterTab)
    displayFilters(filterTab)

}

function displayFilters(element)
{
    if(element.id==="filter-brand")
    {
        brands=[
            "Neighborhood",
            "Maison Mihara Yasuhiro",
            "Y-3",
            "Kenzo",
            "Human Made",
            "Vetements",
            "Andersson Bell",
            "Rhude",
            "Carhartt Wip",
        ]

        brands.forEach(brand=>{
            const label = document.createElement("label"); 
            const checkbox = document.createElement("input");

            checkbox.type = "checkbox"; 
            checkbox.addEventListener("change", handleBrandFilters); 

            label.appendChild(checkbox); 
            label.appendChild(document.createTextNode(brand)); 
            element.appendChild(label); 
        })
    }
}


const handleBrandFilters = async() =>{
    //prima oara vedem care branduri au fost selectate
    const selectedBrands = []
    document.querySelectorAll('#filter-brand label input[type="checkbox"]:checked').forEach((checkbox) => {
        selectedBrands.push(checkbox.parentElement.textContent.trim()); 
    });
    // const query = selectedBrands.length > 0 ? `?brand=${selectedBrands.join(',')}`: '' ASTA ERA O METODA
    const filters = {}
    filters.brand = selectedBrands.join(',')
    showItems(1,filters)


}

////////////////////////////////////////////////////////////
//AICI ESTE GRID-UL CU ITEME
const showItems = async(page = 1,filters = {}) =>{
    try{
        itemsGrid.innerHTML = "Loading....."

        const queryParams = new URLSearchParams({page, ...filters})
        console.log(queryParams)
        const {data:{products,productsLength}} = await axios.get(`/api/v1/products?page=${queryParams}`)

        if(products.length < 1){
            itemsGrid.innerHTML = '<h1>No items in the database</h1>'
            return
        }
        const allProducts = products.map((item)=>{
            const {_id,name,price,brand,images} = item
            return `<div class="product-item" data-images='${JSON.stringify(images)}'>
                <img class="main_image" src = ${images[0]}>
                <div class="item-favourite-name-box">
                    <p>${brand}</p>
                    <h2>${name}</h2>  
                    <div class="item-price-favourite-box">
                        <p id="full-price">${price}$</p>
                        <button class="favourite-item">
                            <img src="white_star.png" alt="favourite">
                        </button>
                    </div>          
                </div> 
                </div>`
        }).join('')
        itemsGrid.innerHTML = allProducts

        addHoverEffect()

        pagination(productsLength)
        pageTransition()

    }
    catch(error){
        console.error(error)
    }
}


//  PAGINATION BUTTONS   ///////////////////////////////////////////////

const paginationContainer = document.querySelector('.number-buttons')
const pagination = (totalProducts)=>{
    const totalPages = Math.ceil(totalProducts/12)
    let paginationButtons = ''
    for(let i=1;i<=totalPages;i++)
        {
            paginationButtons+=`<button class="pagination-button">${i}</button>`
        }
    paginationContainer.innerHTML = paginationButtons

}

showItems()

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



const pageTransition = async() =>{
    const pageButtons = document.querySelectorAll('.pagination-button')
    console.log(pageButtons)

    pageButtons.forEach(button => {
        button.addEventListener("click",()=>{
            pageNumberButton = button.innerHTML
            showItems(pageNumberButton)
        })
    })
}



////// FILTER ARROW ANIMATION//////////////////////////


// const filter = document.querySelectorAll('.filter-name')
// filter.forEach( item => {
//     item.addEventListener('mouseenter',()=>{
//         item.classList.add('arrow-filter')
//         const arrowElement = document.createElement('p'); 
//         arrowElement.innerHTML = '&#10095;'; 
//         arrowElement.classList.add('arrow-element'); 
//         item.appendChild(arrowElement); 
//     })
//     item.addEventListener('mouseleave',()=>{
//         item.classList.remove('arrow-filter')
//         const arrowElement = item.querySelector('.arrow-element')
//         item.removeChild(arrowElement)
//     })
// })
