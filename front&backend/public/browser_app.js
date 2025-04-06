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
    filterCategory = element.id.split('-')[1]
    const filterOptions = {

        brand:[
            "Neighborhood",
            "Maison Mihara Yasuhiro",
            "Y-3",
            "Kenzo",
            "Human Made",
            "Vetements",
            "Andersson Bell",
            "Rhude",
            "Carhartt Wip",
        ],
        size:["XS","S","M","L","XL","XXL"],
        category : [
            "Shirts",
            "T-Shirts",
            "Hoodies",
            "Jackets",
            "Pants",
            "Shorts",
            "Sweaters",
            "Coats",
            "Accessories",
        ]
    }
    const option = filterOptions[filterCategory]
    option.forEach(item=>{
        const label = document.createElement("label"); 
        const checkbox = document.createElement("input");

        checkbox.type = "checkbox"; 
        checkbox.addEventListener("change", handleBrandFilters); 

        label.appendChild(checkbox); 
        label.appendChild(document.createTextNode(item)); 
        element.appendChild(label); 
    })
}


const slider = document.querySelector(".price-input")
const minPriceInput = slider.querySelector(".min-price")
const maxPriceInput = slider.querySelector(".max-price")
const range_slider = document.querySelector(".range-input")
const progress = range_slider.querySelector(".progress")
const minInput = range_slider.querySelector(".min-input")
const maxInput = range_slider.querySelector(".max-input")

const UpdateProgress = () =>{
    const minValue = parseInt(minInput.value)
    const maxValue = parseInt(maxInput.value)

    //get the total range of the slider
    const range = maxInput.max - minInput.min

    //get the selected value range of the progress
    const valueRange = maxValue - minValue

    //calculate the width percentage
    const width = valueRange / range * 100

    //calculate the min thumb offset
    const minOffset = ((minValue - minInput.min)/range)*100
    //update the progress width
    progress.style.width = width + "%"
    progress.style.left = minOffset + "%"
}

const updateRange = (event) =>{
    const input = event.target

    let min = parseInt(minPriceInput.value)
    let max = parseInt(maxPriceInput.value)

    if(input === minPriceInput && max > min){
        max = min
        maxPriceInput.value = max
    }
    else if(input === maxPriceInput && max < min)
    {
        min = max
        minPriceInput.value = min
    }
    minInput.value = min
    maxInput.value = max

    UpdateProgress()
}

minPriceInput.addEventListener("input", updateRange)
maxPriceInput.addEventListener("input", updateRange)

minInput.addEventListener("input",()=>{
    const minValue = parseInt(minInput.value);
    const maxValue = parseInt(maxInput.value);

    // Ensure the min value does not exceed the max value
    if (minValue >= maxValue) {
        maxInput.value = minValue;
    }

    // Update the price inputs
    minPriceInput.value = minInput.value;
    maxPriceInput.value = maxInput.value;

    // Update the progress bar
    UpdateProgress();

    // Debugging logs
    console.log("Thumb Dragging:");
    console.log("Min Thumb:", minInput.value);
    console.log("Max Thumb:", maxInput.value);
})

maxInput.addEventListener("input",()=>{
    const minValue = parseInt(minInput.value);
    const maxValue = parseInt(maxInput.value);

    // Ensure the max value does not go below the min value
    if (maxValue <= minValue) {
        minInput.value = maxValue;
    }

    // Update the price inputs
    minPriceInput.value = minInput.value;
    maxPriceInput.value = maxInput.value;

    // Update the progress bar
    UpdateProgress();

    // Debugging logs
    console.log("Thumb Dragging:");
    console.log("Min Thumb:", minInput.value);
    console.log("Max Thumb:", maxInput.value)
})


let isDragging = false
let startOffsetX




UpdateProgress()


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

        const queryString = buildQueryString(page,filters)
        console.log(queryString)
        const {data:{products,productsLength}} = await axios.get(`/api/v1/products?${queryString}`)

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
        pageTransition(filters)

    }
    catch(error){
        console.error(error)
    }
}

const buildQueryString = (page,filters) => {
    let queryString = `page=${page}`
    for (const key in filters)
    {
        if(filters[key]){
            queryString +=`&${key}=${encodeURIComponent(filters[key])}`
        }
    } 
    return queryString
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



const pageTransition = async(filters) =>{
    const pageButtons = document.querySelectorAll('.pagination-button')

    pageButtons.forEach(button => {
        button.addEventListener("click",()=>{
            const pageNumberButton = button.innerHTML
            showItems(pageNumberButton,filters)
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
