const express = require('express')
const dotenv = require('dotenv')
const morgan= require('morgan')
const connectDB= require('./config/db')
const exphbs= require('express-handlebars')
const path = require('path')
//express sesssions
const session= require('express-session')
//for passport startegies
const passport = require('passport')
// load config file
dotenv.config({path:"./config/config.env"})
//passport config
require('./config/passport')(passport);
//calling our database
connectDB()

const app = express()

//handlebars
app.engine('.hbs', exphbs.engine({defaultLayout:'main',extname:'.hbs'}))
app.set('view engine', '.hbs')
//express midlewares
app.use(session({
  secret:'keyboard cat',
  resave:false,

}))

//sessions
app.use(session({
  secret:'keyboard cat',
  resave:false,
  saveUninitialized:true,
}))

// passport middlewares

app.use(passport.initialize())
app.use(passport.session())

//static folder
app.use(express.static(path.join(__dirname,'public')))
//logging 
if (process.env.NODE_ENV ==="development") {
    app.use(morgan('dev'))
}
//routes
app.use('/', require("./routes/index"))
app.use('/auth', require("./routes/auth"))

const PORT = process.env.PORT||3000 


app.listen(PORT, ()=>{
  console.log(`server running in ${process.env.NODE_ENV} node on port ${PORT}`)  
})