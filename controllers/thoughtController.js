// Grabs the models needed
const { Thought, User } = require('../models');

// Create routes based off what was created int the api
module.exports = {
	// Route to grab all the thoughts
	getThoughts(req, res) {
		Thought.find()
			.then((thoughtData) => res.json(thoughtData))
			.catch((err) => res.status(500).json(err));
	},

	// Route grabs a single thought
	getSingleThought(req, res) {
		Thought.findOne({ _id: req.params.thoughtId })
			.select('-__v')
			.then((thoughtData) =>
				!thoughtData
					? res.status(404).json({ message: 'No thought with that ID' })
					: res.json(thoughtData)
			)
			.catch((err) => res.status(500).json(err));
	},

	// Route to create a thought
	createThought(req, res) {
		Thought.create(req.body)
			.then(({ _id }) => {
				return User.findOneAndUpdate(
					{ _id: req.body.userId },
					{ $push: { thoughts: _id } },
					{ new: true }
				);
			})
			.then((userData) => res.json(userData))
			.catch((err) => {
				console.log(err);
				return res.status(500).json(err);
			});
	},

	// Route to delete thought
	deleteThought(req, res) {
		Thought.findOneAndDelete({ _id: req.params.thoughtId })
			.then((thoughtData) => res.json(thoughtData))
			.catch((err) => res.status(500).json(err));
	},

	// Route to update a thought
	updateThought(req, res) {
		Thought.findOneAndUpdate(
			{ _id: req.params.thoughtId },
			{ $set: req.body },
			{ runValidators: true, new: true }
		)
			.then((thoughtData) =>
				!thoughtData
					? res.status(404).json({ message: 'Not a valid thought id!' })
					: res.json(thoughtData)
			)
			.catch((err) => res.status(500).json(err));
	},

	// Route that adds reaciton to a thought
	addReaction(req, res) {
		Thought.findOneAndUpdate(
			{ _id: req.params.thoughtId },
			{ $push: { reactions: req.body } },
			{ runValidators: true, new: true }
		)
			.then((thoughtData) => res.json(thoughtData))
			.catch((err) => {
				console.log(err);
				res.status(404).json(err);
			});
	},

	// Route that deletes a reaction to a thought
	removeReaction(req, res) {
		Thought.findOneAndUpdate(
			{ _id: req.params.thoughtId },
			{ $pull: { reactions: req.params.reactionId } },
			{ runValidators: true, new: true }
		)
			.then((thoughtData) =>
				!thoughtData
					? res.status(404).json({
							message: 'Error!',
					  })
					: res.json({ message: 'Reaction successfully removed!' })
			)
			.catch((err) => {
				console.log(err);
				res.status(500).json(err);
			});
	},
};
