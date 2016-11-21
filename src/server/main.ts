import path = require('path');
import * as hbs from 'hbs';
import * as express from 'express'

var app = express()
app.set('views', path.join(__dirname, 'views'))
app.set('view engine', 'hbs')
hbs.registerPartials(__dirname + '/views/partials');

app.get('/', function (req: any, res: any) {
  res.render('infantry', { scripts: ['main'] })
})

app.get('/map', function (req: any, res: any) {
  res.render('mapGrid', { scripts: ['main'] })
})

const publicPath = path.join(__dirname, '../public')
app.use('/public', express.static(publicPath))

const port = process.env['PORT'] || 9000
app.listen(port, function () {
  console.log(`Example app listening on port ${port}!`)
})
