const { Schema, model } = require('mongoose');
const reactionSchema = require('./Reaction');
const moment = require('moment/moment');

//Schema for thought model to be used throughout database
const thoughtSchema = new Schema(
	{
		thoughtText: {
			type: String,
			required: true,
			min_length: 1,
			max_length: 180,
		},
		createdAt: {
			type: Date,
			default: Date.now,
			// still using moment
			get: (dateStamp) => moment(dateStamp).format('MMM DD, YYYY [at] hh:mm a'),
		},
		username: {
			type: String,
			required: true,
		},
		// gives thought schema access to reaction schema
		reactions: [reactionSchema],
	},
	{
		toJSON: {
			virtuals: true,
		},
		id: false,
	}
);

// Virtual to keep track of reactions to thoughts
thoughtSchema.virtual('reactionCount').get(function () {
	return this.reactions.length;
});

const Thought = model('Thought', thoughtSchema);

module.exports = Thought;
