require('dotenv').config()
const express = require('express')
const path = require('path')
const app = express()
/////////////////////////////////////
const notFound = require('./middleware/route-not-found')

app.use(express.static('./public/items'))
app.use(express.static('./public'))
app.use(express.json())


const products_router = require('./routes/prod_routes')

app.use('/', products_router)
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'index.html'), (err) => {
        if (err) {
            console.error('Error sending file:', err);
            res.status(500).send('Failed to send file');
        } else {
            console.log('File sent successfully');
        }
    });
});

app.get('/Menu', (req,res)=>{
    //testez mainMenu
})
app.use(notFound)

const port = 5000
const start = async() => {
    try{
        const connectDB = require('./db/connect_database')
        await connectDB(process.env.MONGO_URI)
        app.listen(port, console.log(`Server is listening to port ${port}`))
    }
    catch(error)
    {
        console.log(error)
    }
}

start()