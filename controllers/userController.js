// Grabs user schema for use
const { User } = require('../models');

// Here is the logic for the routes created in the api for the user
module.exports = {
	// Grabs all of the users
	getUsers(req, res) {
		User.find({})
			.select('-__v')
			.then((userData) => res.json(userData))
			.catch((err) => {
				console.log(err);
				res.status(404).json(err);
			});
	},

	// Grabs a signel user
	getSingleUser(req, res) {
		User.findOne({ _id: req.params.userId })
			.select('-__v')
			.lean()
			.then((userData) =>
				!userData
					? res.status(404).json({ message: 'No valid user with that ID!' })
					: res.json({ userData })
			)
			.catch((err) => {
				console.log(err);
				res.status(500).json(err);
			});
	},

	// Creates a user.
	createUser(req, res) {
		User.create(req.body)
			.then((userData) => res.json(userData))
			.catch((err) => res.status(500).json(err));
	},

	// Route to update a user.
	updateUser(req, res) {
		User.findOneAndUpdate({ _id: req.params.userId }, req.body, {
			runValidators: true,
			new: true,
		})
			.then((userData) => {
				if (!userData) {
					res.status(404).json({ message: 'User not found!' });
					return;
				}
				res.json(userData);
			})

			.catch((err) => {
				console.log(err);
				res.status(500).json(err);
			});
	},

	// Route to delete a user.
	deleteUser(req, res) {
		User.findOneAndRemove({ _id: req.params.userId })
			.then((userData) => res.json(userData))
			.catch((err) => res.status(500).json(err));
	},

	// Route to add a friend
	addToFriendList(req, res) {
		User.findOneAndUpdate(
			{ _id: req.params.userId },
			{ $addToSet: { friends: req.params.friendId } },
			{ runValidators: true, new: true }
		)
			.then((userData) => res.json(userData))
			.catch((err) => {
				console.log(err);
				res.status(404).json(err);
			});
	},

	// Route to remove friend
	removeFromFriendList(req, res) {
		User.findOneAndUpdate(
			{ _id: req.params.userId },
			{ $pull: { friends: req.params.friendId } },
			{ runValidators: true, new: true }
		)
			.then((userData) =>
				!userData
					? res.status(404).json({
							message: 'Error!',
					  })
					: res.json({ message: 'Friend deleted!' })
			)
			.catch((err) => {
				console.log(err);
				res.status(500).json(err);
			});
	},
};
