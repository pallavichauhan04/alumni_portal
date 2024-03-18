const mongoose = require('mongoose');
const { Schema } = mongoose;

const JobSchema = new Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Alum',
        required: true,
    },
    name: {
        type: String,
        required: true,
    },
    role: {
        type: String,
        required: true,
    },
    stipend: {
        type: Number,
        required: true,
    },
    date: {
        type: Date,
        default: Date.now,
    },

});

module.exports = mongoose.model('Job', JobSchema);