require('dotenv').config()
const express = require('express')
const bcrypt = require('bcrypt')
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



const port = 5000
const start = async() => {
    try {

        const connectDB = require('./db/connect_database');

        // Connect to the items database
        const itemsConnection = connectDB(process.env.MONGO_URI);
        console.log('Connected to the items database');

        // Connect to the user database
        const userConnection = connectDB(process.env.MONGO_URI_USER);
        console.log('Connected to the user database');

        // Load models for each connection
        const { Product } = require('./models/schema')(itemsConnection);
        const { User } = require('./models/schema')(userConnection);

        // Pass the Product model to the products router
        const productsRouter = require('./routes/prod_routes')(Product);
        app.use('/api/v1/products', productsRouter);

        app.post("/register", (req,res)=>{
            bcrypt.hash(req.body.password,10).
            then((hashedPassword)=>{
                const user = new User({
                    email:req.body.email,
                    password:hashedPassword
                })
            }).
            catch((e)=>{
                response.status(500).send({message:"Password was not hashed succesfully",e})
            })
            //the code above is telling bcrypt to has the passwd 10 times


            user.save()
        })








        app.listen(port, () => console.log(`Server is listening to port ${port}`));
    } catch (error) {
        console.error('Error starting the application:', error.message);
    }
}


start()


app.use(notFound)