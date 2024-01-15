const express = require('express');
const {LottoInfo} = require('../db/lottoinfo')
const {User} = require('../db/user')

const router = express.Router();

// 增添/修改订单信息
// 抽奖逻辑在前端写

// 查询用户过往抽奖记录，方便后续给用户奖励什么的,要不要增加用户表用户等级信息(积分信息),
// 这个规则怎么定
router.get("/userlottoinfo", async (req, res) => {
    // console.log("req:\n", req.query);
    let id = req.query.id
    // console.log("------------------\nid:",id);
    let user = await User.findById({_id: id});

    if(user) {
        res.send({
            code:200,
            msg: "查看成功",
            user
        })
    }else {
        res.send({
            code: 500,
            msg: "查看失败"
        })
    }

})

// 新增一条抽奖记录
// 前端已经获取到该用户的过往抽盲盒信息了,已经为他定制了盲盒规则.点击抽奖后
// 下面就是抽奖结果信息了,当填写了地址之后,用户点击确认,更新这条记录
router.post('/onlotto', async (req,res) => {
    let { uid, lottoid } = req.body;

    // 验证用户名是否可用
    let user = await User.findById({_id: uid})
    console.log("user========\n",user)
    let {alllottonum} = user;

    if(user) {
        // 修改该用户抽奖次数
        let user = await User.updateOne({_id: uid}, {
            alllottonum: alllottonum+1,

        })
        // if(user) {
        //     res.send({
        //         code: 200,
        //         msg: "用户表增加一次抽奖记录成功"
        //     })
        // }else{
        //     res.send({
        //         code: 500,
        //         msg: "用户表增加一次抽奖记录失败"
        //     })
        // }


        let userInfoUpdate = await LottoInfo.create({
            uid: uid,
            proid: lottoid,
            lottotime: Date.now(),
            state: true
        })
        if (userInfoUpdate) {
            
        
            res.send({
                code: 200,
                msg: "用户添加一条盲盒抽奖记录成功"
            })
        } else {
            res.send({
                code: 500,
                msg: "用户添加一条盲盒抽奖记录失败"
            })
        }

        
    }else {
        res.send({
            code: 500,
            msg: "抽奖失败,用户信息有误"
        })
    }

})

// 修改订单信息(未写完)
router.put("/orderedit", async (req,res) => {
    let {_id, account, email, addr, registertime, role} = req.body

    let user = await User.updateOne({_id: _id}, {
        account,
        email,
        addr,
        registertime,
        role,
    })

    if(user) {
        res.send({
            code: 200,
            msg: "修改用户信息成功"
        })
    }else{
        res.send({
            code: 500,
            msg: "修改用户信息失败"
        })
    }


})


// 将路由对象作为模块成员进行导出
module.exports = router;