const express = require('express')
const connectDB = require("./config/db");
const cors = require('cors')
const userRouter = require('./routers/userRoutes/user.routes')
const kidRouter = require('./routers/kidRoutes/missingKid.routes')
const verifyToken = require('./middleware/auth')
const {errorHandler} = require("./middleware/error");
const dotenv = require('dotenv')
const {notFound} = require("./middleware/error");
const app = express()

app.use(express.json({extended: true}))
app.use(express.urlencoded({extended: true}))
// app.use(cors())
dotenv.config()

connectDB()

app.use('/api/user/', userRouter)
app.use('/api/kids/', kidRouter)

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


app.use(notFound)
app.use(errorHandler)

const PORT = 5000

app.listen(PORT, () => {
    console.log("alksjda;", process.env.NODE_ENV)
    console.log(`Server started at Port ${PORT}`)
})