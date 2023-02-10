const { Schema, model } = require('mongoose');

// Chema for the users.
const userSchema = new Schema(
	{
		username: {
			type: String,
			unique: true,
			required: true,
			trim: true,
		},
		email: {
			type: String,
			required: true,
			unique: true,
			// Rgex is used to check for a valid email
			match: [
				/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,
				'Please use a valid email adress.',
			],
		},
		thoughts: [
			{
				// Grabs the thoughts for the user.
				type: Schema.Types.ObjectId,
				ref: 'Thought',
			},
		],
		friends: [
			{
				// Grabs the frinds for the user.
				type: Schema.Types.ObjectId,
				ref: 'User',
			},
		],
	},
	{
		toJSON: {
			virtuals: true,
		},
	}
);

// A vitrual to keep track of a users friends
userSchema.virtual('friendCount').get(function () {
	return this.friends.length;
});

const User = model('User', userSchema);

module.exports = User;
