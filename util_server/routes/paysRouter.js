const express = require('express');
const router = express.Router();

const payModel = require('../db/Module/payModel');

router.get('', async (req, res)=>{
    const {date} = req.query;
    const pays = await payModel.find({time: JSON.parse(date)}).exec();
    res.send(pays);
})

router.post('', async (req, res)=>{
    const {pays} = req.body;
    if(pays.length===0){
        res.statusCode = 200;
        res.end('success');
        return;
    }
    let ans = 0;
    let clain = pays.reduce((prev, pay)=>{
        return prev.then(async ()=>{
            if((await payModel.find({_id:pay._id}).exec()).length === 0){
                await payModel.create(pay)
                ans += 1;
            }else {
                let anos = await(payModel.updateOne({_id:pay._id}, pay));
                ans += anos.modifiedCount;
            }
        });
    }, Promise.resolve());
    clain.then(()=>{
        if(ans === pays.length){
            res.statusCode = 200;
            res.end('success');
        }else {
            res.statusCode = 500;
            res.end('failed')
        }
    });
})

router.post('/:id', async (req, res)=>{
    const { id } = req.params;
    let ans = await payModel.deleteOne({_id:id});
    if(ans.deletedCount === 1){
        res.statusCode = 200;
        res.end('success');
    }else {
        res.statusCode = 500;
        res.end('failed')
    }
})

module.exports = router;