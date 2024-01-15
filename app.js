const express = require("express")
const app = express()
const multer = require("multer")  // 用户上传

const port = 8080

//开放跨域请求
app.use(function (req, res, next) {
    //设置允许跨域的域名，*代表允许任意域名跨域
    res.header("Access-Control-Allow-Origin", "*");
    //允许的header类型
    res.header("Access-Control-Allow-Headers", "*");
    //跨域允许的请求方式
    res.header("Access-Control-Allow-Methods", "DELETE,PUT,POST,GET,OPTIONS");
    if (req.method == "OPTIONS") res.sendStatus(200); //让options尝试请求快速结束
    else next();
});


// 引入数据库
require("./db/DbUtils")

// 第一次链接数据库引入数据
// require('./db/user');
// require("./db/mystinfo");
// require("./db/priceinfo")
// require('./db/lottoinfo')


// 可以看到客户端所有请求
const morgan = require('morgan')

// 路径拼接模块
const path = require("path")
// post请求解析
const bodyParser = require('body-parser')
// 拦截所有post请求，用bodyParser解析
app.use(bodyParser.urlencoded({ extended: false }))
// 中间件json解析
app.use(bodyParser.json())

// 用户上传目录，后面UploadRouter将位置改到./public/upload
const update = multer({
    dest: "./public/upload/temp"
})
app.use(update.any())
//指定静态资源路径
app.use(express.static(path.join(__dirname, "public")))


// 测试用的路由
app.use("/test", require("./routers/TestRouter"))
// app.get("/", (req, res) => {
//     res.send("hello world")
// })

// 正式的路由
app.use("/admin", require("./routers/AdminRouter"))
app.use("/myst", require("./routers/MystinfoRouter"))
app.use("/lotto", require("./routers/LottoRouter"))



app.listen(port, ()=> {
    console.log(`启动成功，端口为：${port}`)
})
