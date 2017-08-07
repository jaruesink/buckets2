import { model, Schema, Document } from 'mongoose';

export interface UserData {
  fbid: number;
  name: string;
  email: string;
  picture?: string;
  status?: string;
}

export type UserType = UserData & Document;

export const UserSchema = new Schema({
  fbid: {
    type: String,
    required: true
  },
  name: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true
  },
  picture: {
    type: String,
    default: 'https://b.static.ak.fbcdn.net/rsrc.php/v1/yo/r/UlIqmHJn-SK.gif'
  },
  status: {
    type: String
  }
});

export const UserModel = model<UserType>('User', UserSchema);
