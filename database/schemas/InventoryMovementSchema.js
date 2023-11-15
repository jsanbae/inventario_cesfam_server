import { Schema } from 'mongoose';

const InventoryMovement = new Schema(
  {
    type: String,
    item: {
      type: Schema.Types.ObjectId, 
      ref: 'items'
    },
    place: String,
    responsable: String,
    comment: String,
    date: Date,
    createdAt: Date,
    updatedAt: Date
  },
  { 
    timestamps: true 
  }
);

export default InventoryMovement;