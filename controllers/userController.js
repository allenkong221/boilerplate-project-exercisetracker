const User = require("../schemas/user");

const createUser = async (req, res) => {
    try {
        const {
            body: { username },
        } = req;
        
        const user = new User({ username });
        await user.save();
        res.json({
            username: user.username,
            _id: user._id,
        });
    } catch(err) {
        console.error("Something went wrong")
        console.error(err)
    }
};

const getUsers = async (req, res) => {
    try {
        const users = await User.find();
        res.json(users);
    } catch(err) {
        console.error("Something went wrong")
        console.error(err)
    }
};

module.exports = {
    createUser,
    getUsers,
};