// 載入
const express = require('express')
const app = express()
const port = 3000

// 設定路由
app.get('/', (req, res) => {
  res.send('test')
})

// 監聽伺服器
app.listen(port, () => {
  console.log(`This express server is listening at http://localhost:${port}`)
})