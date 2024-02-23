const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    username: { type: String, required: true},
    password: { type: String, required: true },
    loginTime:{ type:String ,default:null},
    logoutTime: { type: String, default: null}
});

module.exports = mongoose.model('User', userSchema);
