const mongoose = require('mongoose');
const { db_name, db_port, db_host} = require('../config/db.config');
const payModel = require('../db/Module/payModel');

module.exports = function(success, error){
    if(error === undefined){
        error = (error)=>{
            console.log(error);
        }
    }

    mongoose.connect(`mongodb://${db_host}:${db_port}/${db_name}`);

    mongoose.connection.once('open', ()=>{
        // payModel.create({
        //     title:"吃午饭",
        //     date:new Date(),
        //     type:-1,
        //     price:20,
        //     other:'',
        // })
        success();
    });
    mongoose.connection.once('error', ()=>{
        error();
    })
    mongoose.connection.once('close', ()=>{
        console.log('连接已断开')
    })
}

