const moment = require('moment/moment');
const { Schema, Types } = require('mongoose');

//reaciton schema to be used by the database
const reactionSchema = new Schema({
	reactionId: {
		type: Schema.Types.ObjectId,
		default: () => new Types.ObjectId(),
	},
	reactionBody: {
		type: String,
		required: true,
		max_length: 280,
	},
	username: {
		type: String,
		required: true,
	},
	createdAt: {
		type: Date,
		default: Date.now,
		//moment is called for the timestamp
		get: (dateStamp) => moment(dateStamp).format('MMM DD, YYYY [at] hh:mm a'),
	},
});

module.exports = reactionSchema;
