export const filter_price = (updateItemsCallback) =>{
    
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
    
    
    
    const handleInputChange = () => {
        const minValue = parseInt(minInput.value);
        const maxValue = parseInt(maxInput.value);

        // Ensure the min value does not exceed the max value
        if (minValue >= maxValue) {
            maxInput.value = minValue;
        }

        // Ensure the max value does not go below the min value
        if (maxValue <= minValue) {
            minInput.value = maxValue;
        }

        // Update the price inputs
        minPriceInput.value = minInput.value;
        maxPriceInput.value = maxInput.value;

        // Update the progress bar
        UpdateProgress();

        // Call the callback to update items
       
    };

    const UpdateItems = () =>{
        const minValue = parseInt(minInput.value)
        const maxValue = parseInt(maxInput.value)
        if (typeof updateItemsCallback === "function") {
            updateItemsCallback(minValue, maxValue);
        }
    }

    minInput.addEventListener("input", handleInputChange);
    maxInput.addEventListener("input", handleInputChange);
    
    minInput.addEventListener("mouseup", UpdateItems)
    maxInput.addEventListener("mouseup", UpdateItems)

    UpdateProgress()
    return {minPriceInput,maxPriceInput}
    
}


