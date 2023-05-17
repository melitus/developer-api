import { Document, Types } from 'mongoose';

export interface IDeveloper extends Document {
  _id: string | Types.ObjectId;
  name: string;
  email: string;
  level: Level;
  updatedAt?: Date;
  createdAt?: Date;
}

enum Level {
  junior = 'junior',
  senior = 'senior',
}
export interface IDeveloperOnDevelopment {
  _id: string;
  name: string;
  email: string;
  level: Array<string>;
  updatedAt?: Date;
  createdAt?: Date;
}
