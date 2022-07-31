const express = require('express')
const cors = require('cors')
const mysql = require('mysql')
const app = express()

// 服务启动接口
const port = 1111

// 用户列表
let userRows = []

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
connection.query('select * from user', function (err, row) {
  if (err) {
    console.log('query error!')
  } else {
    userRows = row
  }
})
// connection.end() //关闭连接

// 首页请求 用于查看服务
app.get('/', (req, res) => {
  res.send('Hello World!')
})

// 登陆
app.post('/login', (req, res) => {
  console.log(req.body)
  const body = req.body
  let id = 1
  if (userRows.length > 0) id = userRows[userRows.length - 1].id + 1
  connection.query('insert into user set ?', { ...body, id }, function (err, results, fields) {
    if (err) {
      throw err
    }
    console.log(results)
  })
  connection.query('select * from user', function (err, row) {
    if (err) {
      console.log('query error!')
    } else {
      userRows = row
    }
  })
  // connection.end((err) => {
  //   //关闭数据库
  //   if (err) {
  //     console.error(err.stack)
  //     return
  //   }
  // })
  res.json('123')
})
app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})
