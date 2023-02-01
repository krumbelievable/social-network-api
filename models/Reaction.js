const moment = require('moment/moment');
const { Schema, Types } = require('mongoose');

const reactionSchema = new Schema(  //creating our reaction Schema with the information that will be used for reactions. 
  {
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
      get: dateStamp => moment(dateStamp).format('MMM DD, YYYY [at] hh:mm a')  //using moment for timestamping each reaction. 
    },
  },
);

module.exports = reactionSchema;