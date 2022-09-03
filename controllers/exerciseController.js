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
    const dateObj = new Date(date+"T00:00");
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
        username: user.username,
        description: exercise.description,
        duration: exercise.duration,
        date: exercise.date.toDateString(),
        _id: user._id,
    });
};

module.exports = { createExercise };