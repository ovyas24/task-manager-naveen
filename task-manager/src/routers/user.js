const express = require('express');
const User = require('../models/user');
const auth = require('../middleware/auth');
const router = new express.Router();

// Create User or SignUp
router.post('/users', async (req, res) => {
    const user = new User(req.body);

    try { 
        const token = await user.generateAuthToken();
        await user.save();
        res.status(201).send({user, token});
    } catch (e) {
        res.status(400.).send(e);
    }
});

// Login a User
router.post('/users/login', async (req, res) => {
        try {
            const user = await User.findByCredentials(req.body.email, req.body.password);
            const token = await user.generateAuthToken();
            res.send({ Message: "Logged In Successfully!", user, token});
        } catch (e) {
            res.status(400).send();
        }
});

// Logout a User
router.post('/users/logout', auth, async (req, res) => {
        try {
            req.user.tokens = req.user.tokens.filter((token) => {
                return token.token !== req.token
            });
            await req.user.save();

            res.send('User loggedout successfully!');
        } catch (e) {
            res.status(500).send(e);
        }
});

// Logout All Users
router.post('/users/logoutAll', auth, async (req, res) => {
        try {
            req.user.tokens = [];
            await req.user.save();
            res.send('All users logged out!')
        } catch (e) {
            res.status(500).send(e)
        }
});

// User porfile
router.get('/users/me',auth , async (req, res) => {
    res.send(req.user);
});

// Update a User
router.patch('/users/me', auth, async (req, res) => {
    const updates = Object.keys(req.body);
    const allowedUpdates = ['name', 'email', 'password', 'age'];
    const isValidOperation = updates.every((update) =>  allowedUpdates.includes(update));

    if (!isValidOperation) {
        return res.status(400).send({ error: 'Invalid updates!' });
    }

       try {
            updates.forEach((update) => req.user[update] = req.body[update]);
            await req.user.save();
            res.send(req.user);
    } catch (e) {
        res.status(400).send(e);
    }
});

// Delete a User
router.delete('/users/me', auth, async(req, res) => {
    try {
        // const user = await User.findByIdAndDelete(req.user._id ); 

        // if (!user) {
        //     return res.status(404).send('User not found');
        // }

        await req.user.remove()
        res.send(req.user);
    } catch (e) {
        res.status(500).send(e);
    }
});


module.exports = router;