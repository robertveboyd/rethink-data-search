import User from './model.js';

const getUsers = (req, res) => {
    const limit = parseInt(req.query.limit);
    const skip = limit * parseInt(req.query.page);
    const name = req.query.name
    const regex = { $regex: name, $options: 'i'}
    User.find({ name: regex }).skip(skip).limit(limit).then((users) => {
        User.count({ name: regex }).exec().then(count => {
            res.send({ users, count })
        })

    });
}

export default { getUsers }