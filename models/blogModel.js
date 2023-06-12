const mongoose = require('mongoose');

var blogSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
        trim: true
    },
    description: {
        type: String,
        required: true
    },
    category: {
        type: String,
        required: true
    },
    numViews: {
        type: Number,
        default: 0
    },
    isLiked: {
        type: Boolean,
        default: false
    },
    isDisLiked: {
        type: Boolean,
        required: false
    },
    likes: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User"
    },
    disLikes: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User"
    },
    Image: {
        type: String,
        default: "https://images.pexels.com/photos/1591056/pexels-photo-1591056.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2"
    },
    author: {
        type: String,
        default: "Admin"
    }
}, {
        toJson: {
            virtuals: true
        },
        toObject: {
            virtuals: true
        },
     timestamps: true
 });

//Export the model
module.exports = mongoose.model('Blog', blogSchema);
