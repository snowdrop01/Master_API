const express = require('express')
const dbConnect = require('./config/dbConnect')
const dotenv = require("dotenv").config();
const authRoute = require('./routes/authRoute');
const productRoute = require('./routes/productRoute')
const blogRoute = require('./routes/blogRoute');
const categoryRoute = require('./routes/categoryRoute')
const blogCategoryRoute = require('./routes/blogCatRoute')
const brandRoute = require('./routes/brandRoute')
const coupanRoute = require('./routes/coupanRoute')
const bodyParser = require('body-parser');
const { notFound, errorHandler } = require('./middleware/errorHandler');
const cookieParser = require('cookie-parser')
const morgan = require('morgan')


const PORT = process.env.PORT || 4000;
dbConnect();


const app = express();
app.use(morgan('dev'))
// app.use('/', (req,res) => {
//   res.send("Welcome to Cartify")
// })

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));
app.use(cookieParser());

app.use('/api/user',authRoute)
app.use('/api/product',productRoute)
app.use('/api/blog',blogRoute)
app.use('/api/category',categoryRoute)
app.use('/api/blogCategory',blogCategoryRoute)
app.use('/api/brand',brandRoute)
app.use('/api/coupan',coupanRoute)

app.use(notFound);
app.use(errorHandler);

app.listen(PORT , () => {
  console.log("server listing on ", PORT);
})
