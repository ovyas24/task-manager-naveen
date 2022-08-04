const express = require('express');
require('./db/mongoose');
const userRouter = require('./routers/user');
const taskRouter = require('./routers/task')

// start Express server
const app = express();
// Storing port in const
const port = process.env.PORT || 3000;

// To parse the incoming json data from POST request
app.use(express.json());
// Using Routes
app.get('/help', (req, res) => {res.send('Help Me')}
)
app.use(userRouter);
app.use(taskRouter);
// Starting the server
app.listen(port, () => {console.log('Server is up on port: ', port)});

const Task = require('./models/task');
const User = require('./models/user');

const main = async () => {
    // const task = await Task.findById('62c1ee4d9433e411bbc30bf9');
    // await task.populate('owner')
    // console.log(task.owner)
    const user = await User.findById('62c1ee499433e411bbc30bf4');
    console.log(user.tasks)
}

main();