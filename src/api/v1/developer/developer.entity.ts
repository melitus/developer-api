import { Schema, Model, model } from 'mongoose';

import { IDeveloper } from './developer.interface';

const COLLECTION = 'Developer';
const levels = ['senior', 'junior'];

const developerSchema = new Schema(
  {
    name: { type: String },
    email: { type: String },
    level: { type: String, enum: levels, default: 'junior' },
  },
  { timestamps: true },
);

const developerModel: Model<IDeveloper> = model<IDeveloper>(COLLECTION, developerSchema);
export default developerModel;
