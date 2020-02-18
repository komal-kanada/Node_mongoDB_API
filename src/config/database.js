import { connect } from 'mongoose';
import dotenv from 'dotenv';

dotenv.config();

const { DB_NAME, DB_PORT, DB_HOST } = process.env;

connect(`mongodb://${DB_HOST}:${DB_PORT}/${DB_NAME}`, {
    useUnifiedTopology: true,
    useNewUrlParser: true,
})
.then(() => console.log('DB Connected'))
.catch(error => console.log(error));

module.exports = connect;