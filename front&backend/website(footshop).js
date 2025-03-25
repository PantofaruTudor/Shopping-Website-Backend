const axios = require('axios')

const fetchItem = async (req,res) => {
    try{
        const response = await axios.get('https://www.footshop.ro/ro/api/products/similar?id=360328&v=1')
        console.log(response.data)

    }
    catch(error){
        console.log('error')
    }
}

fetchItem()