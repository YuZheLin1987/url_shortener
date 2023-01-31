# url_shortener

![截圖 2023-01-31 下午9 49 07（2）](https://user-images.githubusercontent.com/113798606/215778583-dd02859d-c0c5-4c35-b43b-d0c32c7afb5e.png)

## 功能
+ 輸入想要縮短的網址獲得短網址
+ 使用短網址導向原來網址

## 開始使用

1. 請先安裝node.js以及npm
2. 將專案複製到本地
3. 使用終端機進入資料夾的位置，安裝相關套件
```
npm install
```
4. 設定MONGODB環境變數
  + 在資料夾新增.env檔案
  + 檔案寫入下面內容
```
MONGODB_URI="你的MongoDB連接字串"
```
  + MAC OS可直接建立檔案。WINDOWS OS存擋時檔案類型請選擇 **所有檔案 / ALL FILES** ，避免建立成文字檔txt。
5. 執行程式
```
npm run start
```
6. 成功時終端機會顯示
```
This express server is listening at http://localhost:3000
mongodb connected!
```
7. 到瀏覽器輸入下列網址：http://localhost:3000
8. 結束請在終端機輸入ctrl+c

## 使用工具
+ Node.js@16.17.1
+ Express@4.16.4
+ Express-handlebars@3.0.0
+ Bootstrap@5.2.1
+ Mongoose@5.9.7
+ dotenv@16.0.3
