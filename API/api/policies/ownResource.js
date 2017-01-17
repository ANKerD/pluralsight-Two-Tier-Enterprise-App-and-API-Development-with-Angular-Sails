module.exports = function functionName(req, res, next) {
	var model = req.options.model;

	if (!model) {
		throw "model is required for ownResource policy";
	}

	var Model = req._sails.models[model];

	if (!req.params || !req.params.id) {
		return res.status(401).send({
			error: 'Missig data on the requet'
		});
	}
	Model.findOne(req.params.id)
	.exec(function (err, record) {
		if (!record) {
			return res.status(404).send({
				error: 'Resource not found'
			});
		}

		if (!record.owner) {
			throw "model requires owner property for ownResource policy";
		}

		if (req.userId !== record.owner) {
			console.log('unna');
			return res.status(401).end();
			// .send({
			// 	foo: 'bar'
			// });
		}

		next();
	})
};
