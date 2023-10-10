const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const cookieParser = require('cookie-parser');
const app = express();


dotenv.config({ path: './config.env' });
require('./db/db');

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(cors({ credentials: true, origin: 'http://localhost:3000' }));
app.use(require('./router/router'));



app.all('*', (req, res, next) => {
   res.header("Access-Control-Allow-Origin", "*");
   next();
});


const port = process.env.PORT;

app.listen(port, (e) => {
   console.log(`The Server is Running. Port is ${port}`);
})

