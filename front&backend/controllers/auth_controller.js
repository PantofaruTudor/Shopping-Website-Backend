const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const { User } = require('../models/schema')(require('../db/connect_database')(process.env.MONGO_URI_USER));

// Register a new user
const register = async (req, res) => {
    try {
        const { email, password } = req.body;

        // Hash the password
        const hashedPassword = await bcrypt.hash(password, 10);

        // Create a new user
        const user = new User({
            email: email,
            password: hashedPassword,
        });

        // Save the user to the database
        const result = await user.save();

        res.status(201).send({
            message: 'User Created Successfully',
            result,
        });
    } catch (error) {
        console.error('Error in /register route:', error.message);
        res.status(500).send({
            message: 'Error creating user or hashing password',
            error,
        });
    }
};

// Login a user
const login = async (req, res) => {
    try {
        const { email, password } = req.body;

        // Check if the user exists
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(404).send({ message: 'Email not found' });
        }

        // Compare the password
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(401).send({ message: 'Invalid credentials' });
        }

        // Generate a token
        const token = jwt.sign(
            { userId: user._id, userEmail: user.email },
            'RANDOM-TOKEN',
            { expiresIn: '24h' }
        );

        res.status(200).send({
            message: 'Login Successful',
            email: user.email,
            token,
        });
    } catch (error) {
        console.error('Error in /login route:', error.message);
        res.status(500).send({
            message: 'Error logging in',
            error,
        });
    }
};


const requestPoint = async(req,res,next)=>{
    try{
        
        //   get the token from the authorization header
        const token = await req.headers.authorization.split(" ")[1];

        //check if the token matches the supposed origin
        const decodedToken = await jwt.verify(token, "RANDOM-TOKEN");

        // retrieve the user details of the logged in user
        const user = await decodedToken;

        // pass the user down to the endpoints here
        req.user = user;

        // pass down functionality to the endpoint
        next();

    }
    catch(error)
    {
        response.status(401).json({error: new Error("Invalid request!")})
    }
}


module.exports = { register, login ,requestPoint};