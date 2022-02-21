const { Schema, model } = require('mongoose');

const userSchema = new Schema({
  firstName: String,
  lastName: String,
  phone: String,
  email: String,
  organization: {type: Schema.Types.ObjectId, ref: 'Organization'},
  role: String
}, { timestamps: true });

module.exports = model('User', userSchema);