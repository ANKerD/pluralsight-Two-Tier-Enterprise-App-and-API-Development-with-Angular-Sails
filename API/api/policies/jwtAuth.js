var jwt = require('jwt-simple');

module.exports = function (req, res, next) {
	if (!req.headers.authorization) {
		return handleErr(req, res);
	}

	var token = req.headers.authorization.split(' ')[1];
	var payload = jwt.decode(token, config.TOKEN_SECRET);

	if (!payload) {
		return handleErr(req, res);
	}

	req.userId = payload.sub;
	next();
};

function handleErr(req, res) {
	return res.status(401).send({
		error: 'Not Authorized'
	})
}
