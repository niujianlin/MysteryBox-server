const express = require("express")
const router = express.Router()
// const db = require("../db/DbUtils")
const {User} = require('../db/user')


// 找到一条用户信息
router.get("/test",async (req, res)=> {
    res.send(await User.findOne())
})


module.exports = router