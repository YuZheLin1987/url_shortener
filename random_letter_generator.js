let generatedStringRecord = []

function randomLetterGenerator() {
  const letters = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ1234567890'
  let shortener = ''

  // 先產生一組代碼，並檢查代碼是否有重複，重複則重新產生，直到沒有重複為止
  // 有效的代碼才能成功產生
  do {
    for (let i = 0; i < 5; i++) {
      shortener += pickIndex(letters)
    }
  } while (generatedStringRecord.indexOf(shortener) >= 0)

  // 記錄產生過的代碼
  generatedStringRecord.push(shortener)
  
  return shortener
}

// 隨機選取索引數字
function pickIndex(array) {
  const index = Math.floor(Math.random() * array.length)
  return array[index]
}

module.exports = randomLetterGenerator