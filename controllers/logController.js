const Exercise = require("../schemas/exercise");
const User = require("../schemas/user");

const getLogs = async (req, res) => {
    let {
        params: { id: _id },
        query: { from, to, limit, offset },
    } = req;

    if (!from) from = 0;
    if (!to) to = new Date();
    if (!limit) limit = 10;
    if (!offset) offset = 0;

    const user = await User.findById(_id);
    if (!user) {
        return res.status(404).json({ error: "User not found" });
    }

    const logs = await Exercise.find({ _id }).sort({ date: -1 });

    // filter logs by date range and limit
    const filteredLogs = logs.filter(
        (log) => 
        log.date >= new Date(from) &&
        log.date <= new Date(to) &&
        log.userId === _id
        );

    const limitedLogs = filteredLogs.slice(offset, offset + limit);

    let result = {};

    result._id = user._id;
    result.username = user.username;
    result.count = limitedLogs.length;
    result.log = limitedLogs.map((log) => {
        return {
            description: log.description,
            duration: log.duration,
            date: log.date.toDateString(),
        };
    });

    res.json(result);
};

module.exports = { getLogs };