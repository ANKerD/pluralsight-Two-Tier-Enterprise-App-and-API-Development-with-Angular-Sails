var sails = require('sails');
var Twit = require('twit');

sails.load(function () {
	setInterval(checkPosts, config.SCHEDULER_INTERVAL);
})

function checkPosts() {

	Post.find().where({
		scheduledFor: {
			'<': new Date()
		},
		alreadySent: false
	})
	.populate('owner')
	.exec(function (err, posts) {
		console.log(posts);
		posts.forEach(function (post) {
			sendTweet(
				post.owner.twitterToken,
				post.owner.twitterSecret,
				post.message,
				function () {
					// post.alreadySent = true;
					// post.save(function () {
					// 	console.log('Updated!!!');
					// })
					Post.update({
						id: post.id
					},{
						alreadySent: true
					}).exec(function (err, posts) {
						console.log(posts[0].message);
					})
				}
			)
		});
	});
}
function sendTweet(token, secret, message, callback) {

	var T = new Twit({
		consumer_key: config.TWITTER_KEY,
		consumer_secret: config.TWITTER_SECRET,
		access_token: token,
		access_token_secret: secret
	});

	T.post('statuses/update', { status: message}, callback);
}
