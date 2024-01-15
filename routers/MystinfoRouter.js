const express = require('express');
const {MystInfo} = require('../db/mystinfo.js')

const router = express.Router();
const pagination = require('mongoose-sex-page')

// 查看具体一件产品
router.get("/detail", async (req, res) => {
    // console.log("req:\n", req.query);
    let id = req.query.id
    // console.log("------------------\nid:",id);
    let myst = await MystInfo.findById({_id: id});

    if(myst) {
        res.send({
            code:200,
            msg: "查看成功",
            myst
        })
    }else {
        res.send({
            code: 500,
            msg: "查看失败"
        })
    }

})

// 查看全部商品
router.get("/allpro", async (req, res) => {
    let mystinfos = await MystInfo.find();
    if(mystinfos) {
        res.send({
            code: 200,
            msg: "查找全部商品成功",
            data: mystinfos
        })
    
    }else {
        res.send({
            code: 300,
            msg: "查找产品失败",
        
        })
    }
    
})



// 将路由对象作为模块成员进行导出
module.exports = router;