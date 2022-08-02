import express = require('express')
import cors = require('cors')
import mysql = require('mysql')

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
app.get('/', (req, res) => {
  res.send(userRows)
})

// 注册
app.post('/register', (req, res) => {
  const body = req.body
  const id = 1
  if (!userRows.find((item) => item.userName === body.userName)) {
    connection.query('insert into user set ?', { ...body, id }, function (err) {
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

// 启动服务
app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})
