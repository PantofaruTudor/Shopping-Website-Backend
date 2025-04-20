require('dotenv').config()
const express = require('express')
const path = require('path')
const app = express()
/////////////////////////////////////
const notFound = require('./middleware/route-not-found')

app.use(express.json())



const products_router = require('./routes/prod_routes')
app.use('/api/v1/products', products_router)


app.use(express.static('./public'))
app.get('/', (req,res)=>{
    //testez mainMenu
    res.sendFile(path.join(__dirname,'public/Main','index.html'), (err)=>{
        if (err) {
            console.error('Error sending file:', err);
            res.status(500).send('Failed to send file');
        } else {
            console.log('File sent successfully for the main_menu');
        }
    })
})

app.use(express.static('./public/items'))
app.get('/noutati', (req, res) => {
    res.sendFile(path.join(__dirname, 'public/items', 'index.html'), (err) => {
        if (err) {
            console.error('Error sending file:', err);
            res.status(500).send('Failed to send file');
        } else {
            console.log('File sent successfully for the items page');
        }
    });
});



app.use(express.static('./public'))
app.get('/log-in', (req, res) => {
    res.sendFile(path.join(__dirname, 'public/user_AUTH', 'index.html'), (err) => {
        if (err) {
            console.error('Error sending file:', err);
            res.status(500).send('Failed to send file');
        } else {
            console.log('File sent successfully for the mata page');
        }
    });
    const user_data = require('./public/user_AUTH/user_AUTH.js')
    user_data()
});



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