const mongoose = require('mongoose');
const dayjs = require('dayjs');

const payScheme = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    date: {
        type: Date,
        default: dayjs().toDate(),
    },
    time:{
        type:String,
        default:dayjs().toString(),
    },
    // 1-收入 -1-支出
    type: {
        type:Number,
        default:-1,
    },
    price:{
        type:Number,
        default:0
    },
    other: {
        type:String,
        default:''
    }
});

const payModel = mongoose.model('pay', payScheme);

module.exports = payModel;