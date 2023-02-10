const router = require('express').Router();
// all of the routes for the api that a user can access
const {
	getUsers,
	getSingleUser,
	updateUser,
	createUser,
	deleteUser,
	addToFriendList,
	removeFromFriendList,
} = require('../../controllers/userController');

// route to users

router.route('/').get(getUsers).post(createUser);

// route to specific user
router.route('/:userId').get(getSingleUser).delete(deleteUser).put(updateUser);

// route to add a friend
router.route('/:userId/friends/:friendId').post(addToFriendList);

// route to remove a friend
router.route('/:userId/friends/:friendId').delete(removeFromFriendList);

module.exports = router;
