// 載入
const express = require('express')
const app = express()
const exphbs = require('express-handlebars')
const randomLetterGenerator = require('./random_letter_generator')
const Record = require('./models/record')
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
app.use(express.static('public'))
app.use(express.urlencoded({ extended: true }))

app.get('/', (req, res) => {
  res.render('index')
})

// 縮網址
app.post('/shorten', (req, res) => {
  const inputURL = req.body.inputURL

  // 針對輸入的網址先查詢是否有縮過網址了
  Record.findOne({ "original": `${inputURL}` })
    .lean()
    .then(record => {
      // 如果沒有就會記錄下來並產生一組新的短網址代碼
      if(!record) {
        const shortenLetters = randomLetterGenerator()
        const shortenURL = `http://localhost:3000/${shortenLetters}`
        Record.create({
          original: `${inputURL}`,
          shorten: `${shortenLetters}`
        })
        res.render('shorten', { shortenURL })
      } else {
        // 如果已經有紀錄，則提供資料庫中紀錄的短網址
        const shortenURL = `http://localhost:3000/${record.shorten}`
        res.render('shorten', { shortenURL })
      }
    })
    .catch(error => console.log(error))

})

// 導向原始網頁
app.get('/:shortenLetters', (req, res) => {
  const shortenLetters = req.params.shortenLetters
  Record.findOne({ "shorten": `${shortenLetters}` })
    .lean()
    .then(record => {
      // 如果提供錯誤的短網址，進入失敗的畫面
      if(!record) {
        res.render('fail')
      } else {
        res.redirect(record.original)
      }

    })
    .catch(error => console.log(error))
})

// 監聽伺服器
app.listen(port, () => {
  console.log(`This express server is listening at http://localhost:${port}`)
})