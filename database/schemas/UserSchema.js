import { Schema } from 'mongoose';

const User = new Schema(
  {
    email: { type: String, unique: true},
    password: { type: String },
    name: {type: String},
    role: {type:String, enum: ['Admin', 'Auditor', 'Mantenedor']},
    photo: {type: String, nullable: true},
    token: { type: String, nullable: true},
  },
  { 
    timestamps: true 
  }
);

export default User;