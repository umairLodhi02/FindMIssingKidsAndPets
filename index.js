const express = require('express')
const connectDB = require("./config/db");
const cors = require('cors')
const userRouter = require('./routers/userRoutes/user.routes')
const verifyToken = require('./middleware/auth')
const app = express()

app.use(express.json({extended: true}))
app.use(express.urlencoded({extended: true}))
app.use(cors())

connectDB()
app.post("/welcome", verifyToken, (req, res) => {
    res.status(200).send("Welcome 🙌 ");
});

app.use('/api/user/', userRouter)

app.use("*", (req, res) => {
    res.status(404).json({
        success: "false",
        message: "Page not found",
        error: {
            statusCode: 404,
            message: "You reached a route that is not defined on this server",
        },
    });
});
const PORT = 5000

app.listen(PORT, () => console.log(`Server started at Port ${PORT}`))