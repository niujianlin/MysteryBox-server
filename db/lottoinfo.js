//创建用户集合
const mongoose = require('mongoose');

//创建盲盒产品集合规则
const lottoinfoSchema = new mongoose.Schema({
    uid: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },
    proid: {
        type: String,
        ref: 'MystInfo'
    },
    lottotime: {
        type: Date,
        // default: Date.now()
    },
    state: {
        // 用户是否确认要
        type: Boolean,
        require: true
    },
    istransp: {
        type: Boolean
    },
    deliverid: {
        type: String
    },
    Transptime: {
        type: Date,
    },
    isreceive: {
        type: Boolean,
    },
    receivetime: {
        type: Date,
    },

    

})

//创建集合
const LottoInfo = mongoose.model('LottoInfo', lottoinfoSchema);

async function createLottoInfo() {
    // 创建一些数据，第一次导入初始化数据用的
    const lottoinfo = await LottoInfo.create({
        uid: '659f75298ec4588c2a15c825',
        proid: '0001',
        lottotime: Date.now(),
        state: true,
        istransp: true,
        deliverid: '12412414231434',
        Transptime: Date.now(),
        isreceive: false
        
    })
}
// createLottoInfo();


module.exports = {
    // User: User;与下面一样
    LottoInfo
}




