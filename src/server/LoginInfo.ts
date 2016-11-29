export interface LoginInfo {
	loggedIn: boolean,
	username: string
}

export function getLoginInfo(cookies: any): LoginInfo {
	var loginCookie: string = cookies['webwar_username']
	return {
		loggedIn: loginCookie != null,
		username: loginCookie
	}
}