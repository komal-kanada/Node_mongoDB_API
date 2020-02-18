import express from 'express';
import { urlencoded, json } from 'body-parser';
import cors from 'cors';
import dotenv from 'dotenv';
import routes from './src/routes/index';
import database from './src/config/database';

const app = express();
app.use(cors());
dotenv.config();

app.use(urlencoded({ extended: false }))

// parse application/json
app.use(json())
app.use('/api',routes);

const port = process.env.PORT || 4000 ;
app.listen(port, (req,res)=>{
    console.log(`server running on ${port}`)
});