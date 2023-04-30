require('dotenv').config();
require('express-async-errors');

const express = require('express');
const app = express();

const notFoundMiddleware = require('./middleware/not-found');
const errorMiddleware = require('./middleware/error-handler');

app.use(express.json());

const connectDB = require('./db/connect');
const productrouter = require('./routes/products');

// for routes
app.get('/', (req, res)=>{
    res.send('<h1>Store api <a href="/api/v1/products">product route</a></h1>')
})

app.use('/api/v1/products', productrouter);

app.use(notFoundMiddleware)
app.use(errorMiddleware)

const port = process.env.PORT || 3000

const start =async()=>{
    try{
        await connectDB(process.env.MONGO_URI)
        app.listen(port, console.log(`server is listening to port ${port}`))
    }catch(err){
        console.log(err)
    }
}
start()
// app.listen(3000,)