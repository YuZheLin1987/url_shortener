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

app.post('/shorten', (req, res) => {
  const inputURL = req.body.inputURL

  Record.findOne({ "original": `${inputURL}` })
    .lean()
    .then(record => {
      if(!record) {
        const shortenLetters = randomLetterGenerator()
        const shortenURL = `http://localhost:3000/${shortenLetters}`
        Record.create({
          original: `${inputURL}`,
          shorten: `${shortenLetters}`
        })
        res.render('shorten', { shortenURL })
      } else {
        const shortenURL = `http://localhost:3000/${record.shorten}`
        res.render('shorten', { shortenURL })
      }
    })
    .catch(error => console.log(error))

})

app.get('/:shortenLetters', (req, res) => {
  const shortenLetters = req.params.shortenLetters
  Record.findOne({ "shorten": `${shortenLetters}` })
    .lean()
    .then(record => {
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