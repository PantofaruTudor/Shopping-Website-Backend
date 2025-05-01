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

module.exports = { register, login };