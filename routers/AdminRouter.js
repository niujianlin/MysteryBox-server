const express = require('express');
//调用用户集合构造函数
const { User } = require('../db/user')
// 创建博客展示页面路由,返回的是路由对象
const router = express.Router();
// //引入加密模块
const bcryptjs = require('bcryptjs')
// 生成token
const {v4:uuidv4} = require("uuid")


//二级路由：匹配/login（先匹配/admin，后匹配/login）

// 查找全部用户（需要是管理员role："admin"）
router.get("/user", async(req,res) => {
    let token = req.headers['authorization'];
    if (!token) {
        // 若未携带token，不允许
        return res.status(401).json({ message: '没有提供Token' });
    }
    // 判断是否为管理员的token
    token = token.split(' ')[1]
    let admin = await User.findOne({token: token})
    if (!admin) {
        return res.status(401).json({ message: '没有有效提供Token' });
    }
    let {role} = admin
    if(role === "admin"){
        // 是管理员，允许查看
        let users = await User.find();
        console.log("所有user:\n",users)
        if(users){
            res.send({
                code: 200,
                msg: "查找全部用户成功",
                data: users
            })
        }else{
            res.send({
                code: 500,
                msg: "查找全部用户失败"
            })
        }
    }else{
        res.send({
            code: 500,
            msg: "没有权限，查找全部用户失败"
        })
    }


})

// 用户登录
router.post('/login', async (req, res) => {
    // const { account, password } = req.query;
    const { account, password } = req.body;
    // console.log(account, password)
    // console.log(req.body)

    let user = await User.findOne({account: account});
    // let user = await User.findOne({ account: account, password: password })
    // console.log(user)
    if (user) {
        let isValid = bcryptjs.compareSync(password, user.password);
        if(isValid) {
            // 用户名密码正确，生成token
            let login_token = uuidv4()
            await User.updateOne({account: account}, {
                token: login_token
            })

            res.send({
                code: 200,
                msg: "登录成功",
                data: {user,login_token}
            })
        }else{
            res.send({
                code: 500,
                msg: "登录失败，密码错误或被封禁"
            })
        }
    } else {
        //没查到用户
        res.send({
            code: 404,
            msg: "没找到该用户"
        })
    }

});

// 添加用户
router.post('/add', async (req,res) => {
    let { account, password, email, addr, role, token } = req.body;

    // 验证account用户名是否占用
    let user = await User.findOne({account: req.body.account})
    if(user) {
        res.send({
            code: 300,
            msg: "该用户名已存在"
        })
    }else {
        const hashpsw = bcryptjs.hashSync(password, 10);
        let newuser = await User.create({
            account: account,
            password: hashpsw,
            email: email,
            addr: addr,
            role: role,
        })
        if (newuser) {
            res.send({
                code: 200,
                msg: "添加成功"
            })
        } else {
            res.send({
                code: 500,
                msg: "添加失败"
            })
        }
    }


})


// 修改用户信息
router.put("/useredit", async (req,res) => {
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