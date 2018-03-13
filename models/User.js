const mongoose = require('mongoose');
// const Schema = mongoose.Schema; destructed below
const { Schema } = mongoose;

const userSchema = new Schema({
	googleId: String
});

mongoose.model('users', userSchema);
// tell mongoose that userSchema collection was created
// users is name of collection
// creates model class
