const express = require('express');
const router = express.Router();
// Import necessary models or services here
const User = require('../models/users');

//Getting all Users
router.get('/', async (req, res) => {
    try {
        // Logic to get all users from the database
        const users = await User.find(); // Assuming User is a Mongoose model
        res.status(200).json(users);
    } catch (error) {
        res.status(500).json({ error: 'Error fetching users' });
    }
});

//Getting One User
router.get('/:id', getUserById, (req, res) => {
    // The user is already fetched by the getUserById middleware
    res.status(200).json(res.user); // Send the user data as response   
});

//Creating a User
router.post('/', async (req, res) => {
    const newUser = new User({
        name: req.body.name,
        email: req.body.email,
        password: req.body.password

    }); 
    try {
        // Logic to create a new user in the database
        const createdUser = await User.create(newUser); // Assuming User is a Mongoose model
        res.status(201).json(createdUser);
    } catch (error) {
        res.status(400).json({ error: 'Error creating user' });
    }
});

//Updating a User
router.patch('/:id', getUserById, async (req, res) => {
    if (req.body.name != null) {
        res.user.name = req.body.name; // Update the name if provided
    }
    if (req.body.email != null) {
        res.user.email = req.body.email; // Update the email if provided
    }
    if (req.body.password != null) {
        res.user.password = req.body.password; // Update the password if provided
    }
    try {
        // Logic to update a user in the database
        const updatedUser = await res.user.save(); // Save the updated user object
        res.status(200).json(updatedUser);
    } catch (error) {
        res.status(400).json({ error: 'Error updating user' });
    }
   
});

//Deleting a User
router.delete('/:id', getUserById, async (req, res) => {
    try {
        // Logic to delete a user by ID from the database
        await res.user.remove(); // Remove the user object
        res.status(204).send(); // No content response
    } catch (error) {
        res.status(500).json({ error: 'Error deleting user' });
    }
});


async function getUserById(req, res, next) {
    let userId;
   try {
    userId = await User.findById(req.params.id);
    if (!userId) {
        return res.status(404).json({ error: 'User not found' });
    }
   }
   catch (error) {
        return res.status(500).json({ error: 'Error fetching user' });
    }
    res.user = userId; // Attach the user to the response object
    next(); // Call the next middleware or route handler
}

module.exports = router;