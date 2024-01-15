//创建用户集合
const mongoose = require('mongoose');
// //加密模块
 const bcryptjs = require('bcryptjs');
// //引入joi模块
const Joi = require('joi');

//创建用户集合规则
const userSchema = new mongoose.Schema({
    account: {
        type: String,
        require: true,
        minlength: 2,
        maxlength: 20
    },
    password: {
        type: String,
        require: true,
        // select: false // 不在返回时显示password属性
    },
    email: {
        type: String,
        require: true        
    },
    registertime: {
        type: Date,
        default: Date.now()
    },
    role: {
        type: String,
        require: true
    },
    addr: {
        type: String,
    },
    alllottonum: {
        // 全部抽奖次数
        type: Number
    },
    vaillottonum: {
        // 有效抽奖次数
        type: Number
    },
    virtualmoney: {
        type: Number,
        default: 0.0
    },
    token: {
        type: String
    }

})

//创建集合
const User = mongoose.model('User', userSchema);

async function createUser() {
    const pass = bcryptjs.hashSync('123456', 10);
    // 创建一些数据，第一次导入初始化数据用的
    const user = await User.create({
        account: 'user2',
        email: '12333@qq.com',
        password: pass,
        role: 'user',
        alllottonum: 20,
        vaillottonum: 5,

    })
}
// createUser();


module.exports = {
    // User: User;与下面一样
    User,
    // validateUser
}
