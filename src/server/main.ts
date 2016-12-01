import path = require('path');
import * as hbs from 'hbs';
import * as express from 'express'
import * as formidable from 'formidable'
import * as cookieParser from 'cookie-parser'

import { Game, GameState } from '../shared/Game'
import { getGamesWithState, addGame, getGame, startGame, 
	endGame, joinGame, canJoinGame, canStartGame, isUsersTurn, 
	endTurn } from './GameStore'
import { Map } from '../shared/Map'
import { Unit } from '../shared/Unit'
import { Army } from '../shared/Army'
import { LoginInfo, getLoginInfo } from './LoginInfo'

var app = express()
app.set('views', path.join(__dirname, 'views'))
app.set('view engine', 'hbs')
hbs.registerPartials(__dirname + '/views/partials');
app.use(cookieParser())

app.get('/', function (req: any, res: any) {
  res.render('infantry')
})

app.get('/map', function (req: any, res: any) {
  res.render('mapGrid', { scripts: ['mapGrid'] })
})

app.get('/games/:id(\\d+)', function (req: any, res: any) {
	var game = getGame(req.params.id)
	if (game == null) {
		res.status(404).send('No game found with that ID')
	}
	var loginInfo: LoginInfo = getLoginInfo(req.cookies)
	res.render('gamePage', { 
		game: game,
		canStartGame: canStartGame(req.params.id, loginInfo.username),
		isInProgress: game.state == GameState.IN_PROGRESS,
		canJoinGame: loginInfo.loggedIn && canJoinGame(req.params.id, loginInfo.username),
		currentPlayer: game.players[game.currentTurn],
		isUsersTurn: game.state == GameState.IN_PROGRESS && isUsersTurn(req.params.id, loginInfo.username),
		loginInfo: loginInfo,
		scripts: ['login']
	})
})

app.get('/games/waiting', function (req: any, res: any) {
	res.render('gameList', {
		title: "Waiting Games",
		games: getGamesWithState(GameState.WAITING)
	})
})

app.get('/games/inProgress', function (req: any, res: any) {
	res.render('gameList', {
		title: "In Progress Games",
		games: getGamesWithState(GameState.IN_PROGRESS)
	})
})

app.get('/games/finished', function (req: any, res: any) {
	res.render('gameList', {
		title: "In Progress Games",
		games: getGamesWithState(GameState.FINISHED)
	})
})

app.get('/games/create', function (req: any, res: any) {
	var loginInfo: LoginInfo = getLoginInfo(req.cookies)
	res.render('createGame', { loginInfo: loginInfo })
})

app.post('/api/games/create', function (req: any, res: any) {
	var form = new formidable.IncomingForm()
	var loginInfo: LoginInfo = getLoginInfo(req.cookies)

	form.parse(req, function (err: any, fields: any, files: any) {
		var id = addGame(fields.name, fields.numberOfPlayers, loginInfo.username)
		res.redirect('/games/' + id)
	})
})

app.post('/api/games/:id(\\d+)/start', function (req: any, res: any) {
	startGame(req.params.id)
	res.redirect(req.get('referer'));
}) 

app.post('/api/games/:id(\\d+)/end', function (req: any, res: any) {
	endGame(req.params.id)
	res.redirect(req.get('referer'));
}) 

app.get('/api/games/:id(\\d)/join', function (req: any, res: any) {
	var loginInfo: LoginInfo = getLoginInfo(req.cookies)

	joinGame(req.params.id, loginInfo.username)
	res.redirect(req.get('referer'));
})

app.get('/api/games/:id(\\d)/endTurn', function (req: any, res: any) {
	var loginInfo: LoginInfo = getLoginInfo(req.cookies)

	endTurn(req.params.id, loginInfo.username)
	res.redirect(req.get('referer'));
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
