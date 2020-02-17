const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const server = '127.0.0.1:27017'; 
const database = 'TestDB'; 
const routes = require('./routes/index');
const app = express();
const { User } = require('./model/user');

mongoose.connect(`mongodb://${server}/${database}`, { useUnifiedTopology: true,
useNewUrlParser: true, })
        .then(()=>console.log('DB Connected'))
        .catch(error => console.log(error));
// mongoose.set('useCreateIndex', true);
//parse application/x-www-form-urlencoded


app.use(bodyParser.urlencoded({ extended: false }))

// parse application/json
app.use(bodyParser.json())
app.use('/api',routes);

const port = process.env.PORT || 4000 ;
app.listen(port, (req,res)=>{
    console.log(`server running on ${port}`)
});