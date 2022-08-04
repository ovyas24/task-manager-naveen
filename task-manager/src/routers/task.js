const express = require('express');
const Task = require('../models/task');
const auth = require('../middleware/auth')
const router = new express.Router();
// Create Task
router.post('/tasks', auth, async (req, res) => {
    const task = new Task({
        ...req.body,
        owner: req.user._id
    })

    try {
        await task.save();
        res.status(201).send(task);
    } catch (e) {
        res.status(400).send(e);
    }
});

// Read all tasks
router.get('/tasks', async (req, res) => {
    try {
        const tasks = await Task.find({});
        res.status(200).send(req.body);
    } catch (e) {
        res.status(500).send(e);
    }
});

// Read Task by id
router.get('/tasks/:id', async (req, res) => {
    const _id = req.params.id;
    
    try {
        const task = await Task.findById(_id);
        if (!task) {
            return res.status(404).send('Task not found');
        }
        res.send(task);
    } catch (e) {
        res.status(500).send();
    }

})

// Update a Task
router.patch('/tasks/:id', async (req, res) => {
    const updates = Object.keys(req.body);
    const allowedUpdates = ['description', 'completed'];
    const isValidOperation = updates.every((update) => allowedUpdates.includes(update));

    if (!isValidOperation) {
        return res.status(400).send({ error: 'Invalid updates!'});
    }
        
        try {
            const task = await Task.findById(req.params.id);

            updates.forEach((update) => task[update] = req.body[update]);

            await task.save();

            if (!task) {
                res.status(404).send('Task not found');
            }

            res.send(task);
    } catch (e) {
            res.status(400).send(e);
    }
});

// Delete a Task
router.delete('/tasks/:id', async(req, res) => {
    try {
        const task = await Task.findByIdAndDelete(req.param.id);
        
        if (!task) {
            return res.status(404).send('Task not found');
        }

        res.send(task);
    } catch (e) {
            res.status(500).send(e);
    }
});      

module.exports = router;