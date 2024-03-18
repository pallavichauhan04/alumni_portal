const mongoose = require('mongoose');
const { Schema } = mongoose;

const AppliedSchema = new Schema({
    student: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Alum',
        required: true,
    },
    Job:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Job',
        required: true,
    },
    date: {
        type: Date,
        default: Date.now,
    },

});

module.exports = mongoose.model('Applied', AppliedSchema);