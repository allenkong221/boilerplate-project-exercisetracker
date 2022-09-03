const Exercise = require("../schemas/exercise");
const User = require("../schemas/user");

const createExercise = async (req, res) => {
    const {
        body: { description, duration, date },
        params: { id: userId },
    } = req;

    const user = await User.findById(userId);
    if (!user) {
        return res.status(404).json({ error: "User not found" });
    }

    // check if date is valid
    const dateObj = new Date(date);
    if (!dateObj.getTime()) {
        dateObj.setTime(Date.now());
    }

    const exercise = new Exercise({
        userId,
        username: user.username,
        description,
        duration,
        date: dateObj,
    });
    await exercise.save();
    res.json({
        _id: user._id,
        username: user.username,
        date: exercise.date.toDateString(),
        duration: exercise.duration,
        description: exercise.description,
    });
};

module.exports = { createExercise };