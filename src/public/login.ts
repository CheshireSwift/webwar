import $ = require('jquery');

window.onload = function() {
	$('#login-button').click(function() { login()	})
	$('#logout-button').click(function() { logout()	})
}

function login(): void {
	var username: string = prompt()
	document.cookie = "webwar_username=" + username + " ;path=/"
	location.reload()
}

function logout(): void {
	document.cookie = "webwar_username=; expires=Thu, 01 Jan 1970 00:00:00 UTC ;path=/"
	location.reload()
}