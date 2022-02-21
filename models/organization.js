const { Schema, model } = require('mongoose');

const organizationSchema = new Schema({
  name: String,
}, { timestamps: true });

module.exports = model('Organization', organizationSchema);