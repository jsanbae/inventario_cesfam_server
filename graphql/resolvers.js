import { DateTimeISOResolver, JSONObjectResolver } from 'graphql-scalars';
import { Query as ItemQuery, Mutation as ItemMutation } from './item/resolver.js';
import { Query as InventoryMovementQuery, Mutation as InventoryMovementMutation } from './inventorymovement/resolver.js';
import { Query as UserQuery, Mutation as UserMutation } from './user/resolver.js';

const resolvers = {
    Query: {
        ...ItemQuery,
        ...InventoryMovementQuery,
        ...UserQuery,
    },
    Mutation: {
        ...ItemMutation,
        ...InventoryMovementMutation,
        ...UserMutation,
    },
    InventoryMovement: {
        async item(_, args, contextValue) {
            return await contextValue.dataSources.models.Item.findById(_.item);
        }
    },
    DateTime: DateTimeISOResolver,
    JSON: JSONObjectResolver,
};

export default resolvers;