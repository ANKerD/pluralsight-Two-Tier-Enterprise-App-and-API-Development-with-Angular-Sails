/**
 * PostController
 *
 * @description :: Server-side logic for managing posts
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

module.exports = {

	tweet: function (req, res) {


		var message = req.body.message;
		var scheduledFor = req.body.scheduledFor;

		User.findOne(req.userId, function (err, user) {

			if (!user.twitterToken || !user.twitterSecret) {
				return res.send({
					error: 'Missing data'
				})
			}

			Post.create({
				message: message,
				scheduledFor: scheduledFor,
				owner: req.userId,
				alreadySent: false
			}).exec(function (err, post) {
				console.log('created');
				res.status(200).send(post);
			});
		})
	},
	myPosts: function (req, res) {
		Post.find({
			owner: req.userId
		}, function (err, posts) {
			res.json(posts);
		})
	}
};
