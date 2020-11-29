const mongoose = require('mongoose');
const { VISIBILITY } = require('./utils');

const { Schema } = mongoose;

const GiftsSchema = new Schema({
    owner: { type: Schema.Types.ObjectId, ref: 'Users', required: true },
    name: { type: String, required: true, unique: true },
    types: {type: [String], default: 'other'},
    price: {type: Object, default: {min: 0, max: 0, average: 0}},
    reservations: {type: Object, default: []},
    visibility: {type: String, default: VISIBILITY.LoggedIn} //rank of visibility wanted by the card owner (visitor, loggedin, owner)
});

mongoose.model('Gifts', GiftsSchema);