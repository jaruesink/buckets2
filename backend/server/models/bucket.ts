import * as m from 'mongoose';

export interface BucketData {
  name: string;
  type: string;
  amount: number;
  isFund?: boolean;
  ownerID: m.Schema.Types.ObjectId
}

export type BucketType = BucketData & m.Document;

export const BucketSchema = new m.Schema({
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
    type: m.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  }
});

export const BucketModel = m.model<BucketType>('Bucket', BucketSchema);

