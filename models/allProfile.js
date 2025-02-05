const { required } = require('joi');
const { model } = require('mongoose');
const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const allProfileSchema = new Schema({
    dpType: {
        type: String,
        required: true
    },
    profileLink: {
        type: String,
        required: true
    }
});

const allProfile = mongoose.model('allProfile', allProfileSchema);
module.exports = allProfile;