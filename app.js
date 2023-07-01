/*
 * @Description: 服务端入口文件
 * @Version: 1.0
 * @Author: Humbert Cheung
 * @Date: 2022-06-24 00:35:42
 * @LastEditors: [Humbert Cheung]
 * @LastEditTime: 2023-07-01 22:52:56
 * @FilePath: /spark-chat/app.js
 * Copyright (C) 2022 syzhang. All rights reserved.
 */
// 引入 Express 框架
let express = require("express")
// 引入cookie 依赖
let cookie = require("cookie-parser")
// 引入session 依赖
let session = require("express-session")
// 引入路由文件
let router = require("./server/router/index")
// 可自动打开浏览器模块
const cp = require("child_process");

// 创建 express 对象
let app = express()

// 使用express托管静态资源, __dirname是当前文件所在绝对目录的意思

// 配置js、css等资源
app.use(express.static(__dirname + "/web/views/notice"))
// app.use(express.static(__dirname + "/web/assets"))

// 配置图片等静态资源
app.use("/static", express.static(__dirname + "/web/assets"))
// 使用 express解析常用的请求体
app.use(express.urlencoded({
  extended: false
}))
app.use(express.json())
// 添加cookie、session依赖
app.use(cookie())
app.use(session({
  secret: "node-demo",
  resave: true,
  cookie: {
    // 过期时间
    maxAge: 1000 * 30 * 60
  },
  saveUninitialized: true,
  rolling: true //在每次请求时强行设置 cookie，这将重置 cookie 过期时间（默认：false）
}))

// 使用路由
app.use("/", router)

// 启动服务并监听端口
app.listen(3001, "localhost", function () {
  let openingUrl = "http://localhost:3001/notice"
  console.log(openingUrl);
  // 这个语句可以自动调用浏览器运行项目。注意，win系统使用 start 命令，mac系统使用 open 命令,
  // cp.exec("start " + openingUrl);
  cp.exec("open " + openingUrl);
})