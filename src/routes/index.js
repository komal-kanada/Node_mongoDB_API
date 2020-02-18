import express from 'express';
import userRoutes from './user';

const app = express();

app.use('/user',userRoutes);

module.exports = app;