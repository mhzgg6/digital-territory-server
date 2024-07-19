const koaSession = require('koa-session')
const { BASE_CONFIG, SIGNED_KEY } = require("../config/session")

module.exports = {
	create_session (app) {
		const session = koaSession(BASE_CONFIG, app)
		app.keys = SIGNED_KEY
		app.use(session)
	}
}