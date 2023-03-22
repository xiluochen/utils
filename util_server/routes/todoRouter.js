const express = require('express');
const router = express.Router();
const todoModel = require('../db/Module/todoModel');

router.get('', async(req, res)=>{
    const todos = await todoModel.find().exec();
    res.send(todos);
})

router.post('', async(req, res)=>{
    const { title } = req.body;
    todoModel.create({title});
    let now = await todoModel.find().exec();
    res.statusCode = 200;
    res.send(now);
})

router.delete('', async(req, res)=>{
    const { ids } = req.body;
    let ans = await todoModel.deleteMany({_id:{$in:ids}});
    if(ans.deletedCount === ids.length){
        res.statusCode = 200;
        res.end('success');
    }else {
        res.statusCode = 500;
        res.end('failed');
    }
})

module.exports = router;