require('../src/db/mongoose');
const Task = require('../src/models/task');
const User = require('../src/models/user');

Task.findByIdAndDelete( '622701e91b5407fc6decfbda').then((task) => {
    console.log('Task deleted!', task);
    return Task.countDocuments({ completed: false})
}).then((result) => {
    console.log(result);
}).catch((e) => {
    console.log(e)
})

const deleteTaskAndCount = async (id, completed) => {
    const task = await Task.findByIdAndDelete(id);
    const count = await Task.countDocuments({ completed: false });
    // console.log('Incomplete tasks: ', count)
};

deleteTaskAndCount( '6224721e00e5bd752e3a462e', false)