const express = require('express')
const dotenv = require('dotenv')
const morgan= require('morgan')
const connectDB= require('./config/db')
const exphbs= require('express-handlebars')
const path = require('path')
// load config file
dotenv.config({path:"./config/config.env"})

//calling our database
connectDB()

const app = express()

//handlebars
app.engine('.hbs', exphbs.engine({defaultLayout:'main',extname:'.hbs'}))
app.set('view engine', '.hbs')

//static folder
app.use(express.static(path.join(__dirname,'public')))
//logging 
if (process.env.NODE_ENV ==="development") {
    app.use(morgan('dev'))
}
//routes
app.use('/', require("./routes/index"))

const PORT = process.env.PORT||3000 


app.listen(PORT, ()=>{
  console.log(`server running in ${process.env.NODE_ENV} node on port ${PORT}`)  
})