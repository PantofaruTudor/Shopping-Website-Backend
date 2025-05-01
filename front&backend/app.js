require('dotenv').config()
const express = require('express')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const path = require('path')
const app = express()
/////////////////////////////////////
const notFound = require('./middleware/route-not-found')

app.use(express.json())
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

const authRoutes = require('./routes/auth_routes');
app.use('/api/v1/auth', authRoutes); // Register auth routes


const port = 5000
const start = async() => {
    try {

        const connectDB = require('./db/connect_database');
        const itemsConnection = connectDB(process.env.MONGO_URI);

        // Load models for each connection
        const { Product } = require('./models/schema')(itemsConnection);

        // Pass the Product model to the products router
        const productsRouter = require('./routes/prod_routes')(Product);
        app.use('/api/v1/products', productsRouter);


        app.listen(port, () => console.log(`Server is listening to port ${port}`));
    } catch (error) {
        console.error('Error starting the application:', error.message);
    }
}


start()


app.use(notFound)