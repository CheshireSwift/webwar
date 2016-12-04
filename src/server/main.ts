import path = require('path')
import hbs = require('hbs')
import * as express from 'express'
import * as bodyParser from 'body-parser'
import formidable  = require('formidable')

import { Game, getWaitingGames, addGame } from '../shared/Game'
import { Map } from '../shared/Map'
import { Unit } from '../shared/Unit'
import { Army } from '../shared/Army'

var app = express()
app.set('views', path.join(__dirname, 'views'))
app.set('view engine', 'hbs')
hbs.registerPartials(__dirname + '/views/partials');

app.get('/', function (req: any, res: any) {
  res.render('infantry')
})

app.get('/map', function (req: any, res: any) {
  res.render('mapGrid', { scripts: ['mapGrid'] })
})

app.get('/games/waiting', function (req: any, res: any) {
	res.render('gameList', {
		title: "Waiting Games",
		games: getWaitingGames()
	})
})

app.get('/games/create', function (req: any, res: any) {
	res.render('createGame')
})

app.post('/games', bodyParser.json(), function (req: any, res: any) {
	var form = new formidable.IncomingForm()

	form.parse(req, function (err: any, fields: any, files: any) {
		var id = addGame(fields.name)
		res.redirect('/games/' + id)
	})
})

const publicPath = path.join(__dirname, '../public')
app.use('/public', express.static(publicPath))

const port = process.env['PORT'] || 9000
app.listen(port, function () {
  Map.test()
  Unit.test()
  Army.test()
  console.log(`Example app listening on port ${port}!`)
})
