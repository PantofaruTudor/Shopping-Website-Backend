require('dotenv').config()
const express = require('express')
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
const productsRouter = require('./routes/prod_routes');
app.use('/auth', authRoutes)
app.use('/api/v1/products', productsRouter);



const {requestPoint} = require('../front&backend/controllers/auth_controller.js')
app.get("/free-endpoint", (req, res) => {
    res.json({ message: "You are free to access me anytime" });
  });
app.get("/auth-endpoint", requestPoint, (req, res) => {
    res.json({ message: "You are authorized to access me" });
  });


const port = 5000
const start = async() => {
    try {

        const connectDB = require('./db/connect_database');
        app.use((req,res,next)=>{
            res.setHeader("Access-Control-Allow-Origin", "*")
            res.setHeader("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, Authorization")
            res.setHeader("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, OPTIONS")
            next()

            //THIS IS FOR THE CORS ERRORS
        
        })

        



        const itemsConnection = connectDB(process.env.MONGO_URI);


        app.listen(port, () => console.log(`Server is listening to port ${port}`));
    } catch (error) {
        console.error('Error starting the application:', error.message);
    }
}


start()


app.use(notFound)