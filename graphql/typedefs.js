import fs from 'fs';

const Item = fs.readFileSync('./graphql/item/schema.graphql',{ encoding: 'utf8', flag: 'r' });
const InventoryMovement = fs.readFileSync('./graphql/inventorymovement/schema.graphql',{ encoding: 'utf8', flag: 'r' });
const User = fs.readFileSync('./graphql/user/schema.graphql',{ encoding: 'utf8', flag: 'r' });

const typedefs = [Item, InventoryMovement, User].join("\n");

export default typedefs;