let generatedStringRecord = []

function randomLetterGenerator() {
  const letters = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ1234567890'
  let shortener = ''

  do {
    for (let i = 0; i < 5; i++) {
      shortener += pickIndex(letters)
    }
  } while (generatedStringRecord.indexOf(shortener) >= 0)

  generatedStringRecord.push(shortener)
  
  return shortener
}

function pickIndex(array) {
  const index = Math.floor(Math.random() * array.length)
  return array[index]
}

module.exports = randomLetterGenerator