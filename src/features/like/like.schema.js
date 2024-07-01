import mongoose, { Schema } from 'mongoose';

export const LikeSchema = mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: [true, 'UserId is reqd.']
    },
    likeable: {
        type: mongoose.Schema.Types.ObjectId,
        required: [true, 'Select item to be liked'],
        refPath: 'onModel'
    },
    onModel: {
        type: String,
        required: [true, 'Select item to be liked'],
        enum: ['Post', 'Comment']
    }
})