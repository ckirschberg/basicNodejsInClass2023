const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

const User = mongoose.Schema({
    email: {type: String, required: true, unique: true},
    password: {type: String, required: true}
})

User.pre('save', async function(next) {
  const hash = await bcrypt.hash(this.password, 10)
  this.password = hash;
  next();
});

User.methods.isValidPassword = async function(password) {
    return bcrypt.compare(password, this.password)
};


module.exports = mongoose.model('User', User)