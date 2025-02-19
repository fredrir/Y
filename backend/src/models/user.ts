import bcrypt from 'bcrypt';
import { Document, Schema, Types, model } from 'mongoose';

export interface UserType extends Document {
  username: string;
  password: string;
  firstName?: string;
  lastName?: string;
  biography?: string;
  postIds: string[];
  likedPostIds: string[];
  mentionedPostIds: string[];
  repostedPostIds: string[];
  commentIds: string[];
  likedCommentIds: string[];
  mentionedCommentIds: string[];
  followers: Types.ObjectId[];
  following: Types.ObjectId[];
  profilePicture?: string;
  backgroundPicture?: string;
  comparePassword: (candidatePassword: string) => Promise<boolean>;
  verified?: VerifiedTiers;
}

export enum VerifiedTiers {
  UNVERIFIED = 'UNVERIFIED',
  VERIFIED = 'VERIFIED',
  MADS = 'MADS',
  DEVELOPER = 'DEVELOPER',
}

const UserSchema = new Schema<UserType>({
  username: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  firstName: { type: String, default: undefined },
  lastName: { type: String, default: undefined },
  biography: { type: String, default: undefined },
  postIds: { type: [String], default: [] },
  likedPostIds: { type: [String], default: [] },
  mentionedPostIds: { type: [String], default: [] },
  repostedPostIds: { type: [String], default: [] },
  commentIds: { type: [String], default: [] },
  likedCommentIds: { type: [String], default: [] },
  mentionedCommentIds: { type: [String], default: [] },
  followers: [{ type: Schema.Types.ObjectId, ref: 'User', default: [] }],
  following: [{ type: Schema.Types.ObjectId, ref: 'User', default: [] }],
  profilePicture: { type: String, default: undefined },
  backgroundPicture: { type: String, default: undefined },
  verified: {
    type: String,
    enum: Object.values(VerifiedTiers),
    default: VerifiedTiers.UNVERIFIED,
  },
});

UserSchema.pre('save', async function (next) {
  if (!this.isModified('password')) return next();
  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
  next();
});

UserSchema.methods.comparePassword = function (candidatePassword: string) {
  return bcrypt.compare(candidatePassword, this.password);
};

export const User = model<UserType>('User', UserSchema);
