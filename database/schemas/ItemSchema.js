import { Schema } from 'mongoose';

const Item = new Schema(
  {
    type: String,
    name: String,
    internal_code: String,
    description: String,
    brand: String,
    model: String,
    serial_number: String,
    state: String,
    clasification: String,
    createdAt: Date,
    updatedAt: Date
  },
  { 
    timestamps: true 
  }
);

export default Item;