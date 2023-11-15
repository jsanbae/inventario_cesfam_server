import { mongoose } from 'mongoose';
import ItemSchema from './schemas/ItemSchema.js';
import InventoryMovementSchema from './schemas/InventoryMovementSchema.js';
import UserSchema from './schemas/UserSchema.js';

const modelRegistry =  {
    Item: mongoose.model('items', ItemSchema),
    InventoryMovement: mongoose.model('inventory_movements', InventoryMovementSchema),
    User: mongoose.model('users', UserSchema),
}

export default modelRegistry;