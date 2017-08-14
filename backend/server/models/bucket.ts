import { Document, Schema } from 'mongoose';

export interface BucketData {
  name: string;
  type: string;
  amount: number;
  isFund?: boolean;
  ownerID: Schema.Types.ObjectId
}

export type BucketType = BucketData & Document;

export const BucketSchema = new Schema({
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

