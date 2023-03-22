const express = require('express');
const shortid = require('shortid');
const generateData = require('../middleware/appendJSON');

const PayRouter = express.Router();

PayRouter.get('', generateData, (req, res)=>{
    const { date } = req.query;
    res.statusCode = 200;
    res.send(req.jsonDB.get('pays').filter(item=>item.time===JSON.parse(date)));
})

PayRouter.post('', generateData, (req, res)=>{
    const pays = req.jsonDB.get('pays');
    const dataPays =  req.body.pays||[];
    if(dataPays.length!==0){
        dataPays.forEach(item=>{
            let islive = pays.find(target=>target._id === item._id);
            if(islive){
                Object.assign(islive, item)
            }else {
                let nowId = shortid();
                pays.push({...item, _id:nowId, id:nowId});
            }
        })
        req.jsonDB.write();
    }
    res.statusCode = 200;
    res.send('success');
})

PayRouter.post('/:id', generateData, (req, res)=>{
    const pays = req.jsonDB.get('pays');
    const { id } = req.params;
    const ind = pays.reduce((prev,item, index)=>{
        if(item.id === id){
            return index;
        }
        return prev;
    },-1);
    if(ind != -1){
        pays.splice(ind, 1);
    }
    req.jsonDB.write();
    res.statusCode = 200;
    res.send('success')
})

module.exports = PayRouter;

