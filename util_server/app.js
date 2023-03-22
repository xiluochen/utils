const express = require('express');
const bodyParser = require('body-parser');
const {port} = require('./config/app.config');
const paysRouter = require('./routes/paysRouter');
const todoRouter = require('./routes/todoRouter');

const app = express();
const jsonParser = bodyParser.json();
const urlencodedParser = bodyParser.urlencoded({ extended: false });

const db = require('./db/db');

db(()=>{
    app.use(jsonParser);
    app.use(urlencodedParser);

    app.use('/pays', paysRouter)
    app.use('/todo', todoRouter)

    app.listen(port, ()=>{
        console.log('连接建立成功~~~~')
    })
})

