//创建用户集合
const mongoose = require('mongoose');
// //引入joi模块
const Joi = require('joi');

//创建盲盒产品集合规则
const priceinfoSchema = new mongoose.Schema({
    proid: {
        type: String,
        require: true,
        minlength: 2,
        maxlength: 20
    },
    procate: {
        type: String,
        require: true
    },
    discount: {
        type: Number,
    }
    

})

//创建集合
const PriceInfo = mongoose.model('PriceInfo', priceinfoSchema);

async function createPriceInfo() {
    // 创建一些数据，第一次导入初始化数据用的
    const priceinfo = await PriceInfo.create({
        proid: '0001',
        discount: 0.7
        
    })
}
// createPriceInfo();


module.exports = {
    // User: User;与下面一样
    PriceInfo,
    // validateUser
}
