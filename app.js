// 載入
const express = require('express')
const app = express()
const exphbs = require('express-handlebars')
const mongoose = require('mongoose')

if(process.env.NODE_ENV !== 'production') {
  require('dotenv').config()
}

mongoose.connect(process.env.MONGODB_URI, { useNewUrlParser: true, useUnifiedTopology: true })
const port = 3000

// 取得資料庫連線狀態
const db = mongoose.connection

db.on('error', () => {
  console.log('mongodb error!')
})

db.once('open', () => {
  console.log('mongodb connected!')
})

// 設定樣版引擎
app.engine('handlebars', exphbs({ defaultLayout: 'main' }))
app.set('view engine', 'handlebars')

// 設定路由
app.get('/', (req, res) => {
  res.render('index')
})

// 監聽伺服器
app.listen(port, () => {
  console.log(`This express server is listening at http://localhost:${port}`)
})