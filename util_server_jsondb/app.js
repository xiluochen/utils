const express = require('express')
const bodyParser = require('body-parser');
const { port } = require('./config/appConfig.js');

const PayRouter = require('./router/payRouter.js');
const TodoRouter = require('./router/todoRouter.js');

const app = express();
const jsonParser = bodyParser.json();
const urlencodedParser = bodyParser.urlencoded({ extended: false });


app.use(jsonParser);

app.use(urlencodedParser);

app.use('/pays', PayRouter);
app.use('/todo', TodoRouter);

app.listen(port, ()=>{
    console.log('连接建立成功。。。')
})


