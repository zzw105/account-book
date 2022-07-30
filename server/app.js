const express = require('express')
const cors = require('cors')
const app = express()
const port = 1111

app.use(cors())
app.get('/', (req, res) => {
  res.send('Hello World!')
})
app.post('/login', (req, res) => {
  console.log(req)
  res.json('123')
})
app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})
