require('../src/db/mongoose');
const User = require('../src/models/user');

// 6226f4c4fcfc492892d1ddb4

// User.findByIdAndUpdate('6226efc6f179a819f16df534', {age: 1}).then((user) => {
//     console.log(user);
//     return User.countDocuments({ age: 1 }).then((result) => {
//         console.log(result);
//     }).catch((e) => {
//         console.log(e);
//     })
// })

const updateAgeAndCount = async (id, age) => {
    const user = await User.findByIdAndUpdate(id, { age });
    const count = await User.countDocuments({ age });
    return count;
};

updateAgeAndCount('6227806d71d9c990782f6580', 2).then((count) => {
    console.log(count);
}).catch((e) => {
    console.log(e)
})