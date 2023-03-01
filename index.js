const express = require('express')
const cookieParser = require('cookie-parser');

const app = express();
require("dotenv").config();
app.use(express.json());
app.use(cookieParser());

const routes = require('./routes');
app.use('/api/user', routes.user);
app.use('/api/auth', routes.auth);
app.get('/', (req, res)=>{
    res.send({message: 'OK'});
})

// app.get('/test', (req, res)=>{
//     res.send({message: 'test OK'});
// })

app.listen(3000, () => {
    console.log('server running on 3000 port');
})