require('dotenv').config()
const express = require('express')
const cors = require('cors')

const connectMongoDB = require("./database/connectMongoDB");
const userRouter = require("./routes/user");
const exerciseRouter = require("./routes/exercise");
const logRouter = require("./routes/log");

const app = express()

app.use(cors())
app.use(express.json());
// setup app to handle form data
app.use(express.urlencoded({ extended: true }));
app.use(express.static('public'))
app.get('/', (req, res) => {
  res.sendFile(__dirname + '/views/index.html')
});

app.use("/api/users", userRouter);
app.use("/api/users/:id/exercises", exerciseRouter);
app.use("/api/users/:id/logs", logRouter);
// /api/users/:_id/logs

const start = async () => {
  await connectMongoDB();
  const listener = app.listen(process.env.PORT || 3000, () => {
    console.log("Your app is listening on port " + listener.address().port);
  });
};

start();