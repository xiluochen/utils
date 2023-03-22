const express = require('express');
const shortid = require('shortid');
const generateData = require('../middleware/appendJSON');

const router = express.Router();

router.get('', generateData, (req, res)=>{
    res.statusCode = 200;
    res.send(req.jsonDB.get('todos'));
})

router.post('', generateData, (req, res)=>{
    const todos = req.jsonDB.get('todos');
    const { title } = req.body;
    const nowId = shortid();
    todos.push({
        _id: nowId,
        id:nowId,
        title,
    })
    req.jsonDB.write();
    res.statusCode = 200;
    res.send(todos);
})

router.delete('', generateData, (req, res)=>{
    const todos = req.jsonDB.get('todos');
    const { ids } = req.body;
    const ans = todos.reduce((prev, item, index)=>{
        if(ids.includes(item.id)){
            prev.push(index);
        }
        return prev;
    },[])
    for(let i=ans.length-1;i>-1;i--){
        todos.splice(ans[i], 1);
    }
    req.jsonDB.write();
    res.statusCode = 200;
    res.end('success');
})

module.exports = router;

