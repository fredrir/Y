import { Document, model, Schema, Types } from 'mongoose';

export interface PostType extends Document {
  body?: string;
  originalBody?: string;
  author: Types.ObjectId;
  amtLikes: number;
  amtComments: number;
  amtReposts: number;
  createdAt: Date;
  imageUrl?: string;
  hashTags?: string[];
  mentionedUsers?: Types.ObjectId[];
  communityNote?: string;
}

const PostSchema = new Schema<PostType>({
  body: { type: String, default: undefined },
  originalBody: { type: String, default: undefined },
  author: { type: Schema.Types.ObjectId, ref: 'User', required: true },
  amtLikes: { type: Number, default: 0 },
  amtComments: { type: Number, default: 0 },
  amtReposts: { type: Number, default: 0 },
  createdAt: { type: Date, default: Date.now },
  imageUrl: { type: String, default: undefined },
  hashTags: { type: [String], default: undefined, index: true },
  mentionedUsers: [{ type: Schema.Types.ObjectId, ref: 'User', default: [] }],
  communityNote: { type: String, default: undefined },
});

export const Post = model<PostType>('Post', PostSchema);
