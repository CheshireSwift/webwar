import path = require('path')
import * as express from 'express'

var app = express()
app.set('views', path.join(__dirname, 'views'))
app.set('view engine', 'hbs')

app.get('/', function (req: any, res: any) {
  res.render('index', { words: 'Hello, world!' })
})

const publicPath = path.join(__dirname, '../public')
app.use('/public', express.static(publicPath))

const port = process.env['PORT'] || 9000
app.listen(port, function () {
  console.log(`Example app listening on port ${port}!`)
})
