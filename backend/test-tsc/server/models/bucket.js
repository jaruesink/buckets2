const mongoose = require('mongoose');
mongoose.Promise = global.Promise;
const Schema = mongoose.Schema;
const BucketSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    type: {
        type: String,
        required: true
    },
    amount: {
        type: Number,
        required: true
    },
    isFund: {
        type: Boolean,
        default: false
    },
    ownerID: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true
    }
});
const Bucket = mongoose.model('Bucket', BucketSchema);
module.exports = Bucket;
//# sourceMappingURL=bucket.js.map