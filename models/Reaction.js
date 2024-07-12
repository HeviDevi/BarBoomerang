const mongoose = require('mongoose');

const reactionSchema = new mongoose.Schema({
    reactionId: {
        type: mongoose.Schema.Types.ObjectId,
        default: () => new mongoose.Types.ObjectId()
    },
    userId: {type: String, required: true},
    reactionText: {
        type: String, 
        required: true,
        maxLength: 280, 
        minLength: 2
        },
    datePosted: {type: Date, default: Date.now},
},
{_id: false},
{timestamps: false}

);

const Reaction = mongoose.model('Reaction', reactionSchema);

module.exports = Reaction;