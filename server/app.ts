import express = require('express')
import cors = require('cors')
import mysql = require('mysql')
import { Request } from 'express'

const jwt = require('jsonwebtoken')

const { expressjwt } = require('express-jwt')

const SECRET_KEY = 'kite1874'

declare module 'express' {
  // eslint-disable-next-line no-unused-vars
  interface Request {
    auth: { userName: string }
  }
}

interface userInfo {
  id: number
  userName: string
  password: string
}

const app = express()

// 服务启动接口
const port = 1111
// 用户列表
let userRows: userInfo[] = []

// 解决跨域
app.use(cors())
// 获取post请求的body
app.use(express.json())
app.use(express.urlencoded({ extended: false }))

//除了api开头的请求地址其他地址都需要验证
app.use(
  expressjwt({
    secret: SECRET_KEY,
    algorithms: ['HS256'],
    getToken: (req) => {
      return req.headers.token
    }
  }).unless({
    path: ['/register', '/login']
  })
)
// 解析出来的信息在req.auth中

// 数据库信息
const connection = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: 'Zzw.547896321',
  database: '105'
})

// 启动数据库连接
connection.connect(function (err) {
  if (err) {
    console.log('error', err)
  }
  console.log('connect success!')
})

// 获取用户列表
const getUserRows = () => {
  connection.query('select * from user', function (err, row) {
    if (err) {
      console.log('query error!')
    } else {
      userRows = row
    }
  })
}
getUserRows()

// 首页请求 用于查看服务
app.get('/', (req, res, a) => {
  console.log(req)

  res.json({ code: 200, data: userRows })
})
// 注册
app.post('/register', (req, res) => {
  const body = req.body
  // const id = userRows.length
  if (!userRows.find((item) => item.userName === body.userName)) {
    connection.query('insert into user set ?', { ...body }, function (err) {
      if (err) {
        throw err
      }
    })

    getUserRows()

    res.json({
      code: 200,
      message: '注册成功'
    })
  } else {
    res.json({
      code: 400,
      message: '用户名以重复'
    })
  }
})

// 登陆
app.post('/login', (req, res) => {
  const body = req.body
  const userInfo = userRows.find((item) => item.userName === body.userName)
  if (userInfo && userInfo.password === body.password) {
    const tokenStr = jwt.sign({ userName: body.userName }, SECRET_KEY, { expiresIn: '1h' })
    res.json({
      code: 200,
      message: '登陆成功',
      token: tokenStr
    })
  } else {
    res.json({
      code: 400,
      message: '用户名或密码不正确'
    })
  }
})

// 添加信息
app.post('/addAccount', (req: Request, res) => {
  const body = req.body
  connection.query('insert into book set ?', { ...body, userName: req.auth.userName }, function (err) {
    if (err) {
      console.log(err)
      res.json({
        code: 400,
        message: '添加失败'
      })
    } else {
      res.json({
        code: 200,
        message: '添加成功'
      })
    }
  })
})

// 根据用户名获取信息
app.get('/getAccount', (req: Request, res) => {
  connection.query('select * from book', function (err, row) {
    if (err) {
      res.json({
        code: 400,
        message: '获取失败'
      })
    } else {
      const resData = row.filter((item) => item.userName === req.auth.userName)
      resData.sort((a, b) => {
        return b.dateTime - a.dateTime
      })
      console.log(resData)

      res.json({
        code: 200,
        message: '获取成功',
        data: resData
      })
    }
  })
})

//定义一个抛出错误的中间件 当token失效时 返回信息
app.use((err, req, res, next) => {
  if (err.name === 'UnauthorizedError') {
    return res.json({ code: 401, message: '登陆过期' })
  }
  res.json({ code: 500, message: '未知错误' })
})

// 启动服务
app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})