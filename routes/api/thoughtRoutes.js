const router = require('express').Router();

// routes to be called by the controller

const {
	getThoughts,
	getSingleThought,
	createThought,
	updateThought,
	deleteThought,
	addReaction,
	removeReaction,
} = require('../../controllers/thoughtController.js');

// brings us to thoughts api

router.route('/').get(getThoughts).post(createThought);

// route to specific thought

router
	.route('/:thoughtId')
	.get(getSingleThought)
	.put(updateThought)
	.delete(deleteThought);

// route to reactions to a thought

router.route('/:thoughtId/reactions').post(addReaction);

// route to specific reaction

router.route('/:thoughtId/reactions/:reactionId').delete(removeReaction);
module.exports = router;
