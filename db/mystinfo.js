//创建用户集合
const mongoose = require('mongoose');
// //引入joi模块
const Joi = require('joi');

//创建盲盒产品集合规则
const mystinfoSchema = new mongoose.Schema({
    proid: {
        type: String,
        require: true,
        minlength: 2,
        maxlength: 20
    },
    proname: {
        type: String,
        require: true,
        // select: false // 不在返回时显示password属性
    },
    putontime: {
        type: Date,
        // default: Date.now()
    },
    procate: {
        type: String,
        require: true
    },
    price: {
        type: Number,
    },
    propic: {
        type: String
    }

})

//创建集合
const MystInfo = mongoose.model('MystInfo', mystinfoSchema);

async function createMystInfo() {
    // 创建一些数据，第一次导入初始化数据用的
    const mystinfo = await MystInfo.create({
        proid: '0003',
        proname: '纪念盒',
        putontime: Date.now(),
        procate: "B",
        price: 80,
        propic: 'c盘的pic文件夹'
        
    })
}
// createMystInfo();


module.exports = {
    // User: User;与下面一样
    MystInfo,
    // validateUser
}
