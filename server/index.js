import express from 'express';
import Connection from './databases/db.js';
import Router from './routes/route.js';
import bodyParser from 'body-parser';
import cors from 'cors'
import dotenv from 'dotenv';

dotenv.config();

const app = express();

const PORT = process.env.PORT || 8000;

app.listen(PORT, () => console.log(`Server is started at port ${PORT}`));

app.use(cors());
app.use(bodyParser.json({ extended: true }));
app.use(bodyParser.urlencoded({ extended: true }));
app.use('/', Router);


const USERNAME = process.env.DB_USERNAME
const PASSWORD = process.env.DB_PASSWORD

const URL = `mongodb+srv://${USERNAME}:${PASSWORD}@ecommerce.gewfodb.mongodb.net/?retryWrites=true&w=majority&appName=AtlasApp`;

Connection(URL);