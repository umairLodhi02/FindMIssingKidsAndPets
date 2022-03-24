const express = require('express')
const connectDB = require("./config/db");
const cors = require('cors')
const fileUpload = require('express-fileupload')
const multer = require('multer')


const userRouter = require('./routers/userRoutes/user.routes')
const kidRouter = require('./routers/kidRoutes/kid.routes')
const petRouter = require('./routers/PetRoutes/pet.routes')
const adminRouter = require('./routers/adminRoutes/admin.routes')


const verifyToken = require('./middleware/auth')
const {errorHandler} = require("./middleware/error");
const dotenv = require('dotenv')
const {notFound} = require("./middleware/error");
const app = express()

let storage = multer.diskStorage({
    destination: function(req, file, cb){
        cb(null, './uploads')
    },
    filename: function(req, file, cb){
        cb(null, file.originalname.toLowerCase().split(' ').join('-'))
    }
})

let upload = multer({
    storage: storage,
    fileFilter: (req, file, cb) => {
        if (file.mimetype == "image/png" || file.mimetype == "image/jpg" || file.mimetype == "image/jpeg") {
            cb(null, true);
        } else {
            cb(null, false);
            return cb(new Error('Only .png, .jpg and .jpeg format allowed!'));
        }
    }
})

app.use(express.static(__dirname + '/public'));
app.use('/uploads', express.static('uploads'));

//
// app.use(fileUpload({}));
// app.use(express.static("files"));
app.use(express.json({extended: true}))
app.use(express.urlencoded({extended: true}))
app.use(cors())
dotenv.config()

connectDB()

app.use('/api/user/', upload.single('profileImg'), userRouter)
app.use('/api/kids/', kidRouter)
app.use('/api/pets/', petRouter)
app.use('/api/admin/', adminRouter)

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