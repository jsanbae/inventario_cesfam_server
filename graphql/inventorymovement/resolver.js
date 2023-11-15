import { ApolloServerErrorCode } from '@apollo/server/errors';
import { GraphQLError } from 'graphql';

export const Query = {
    async InventoryMovement(_, { id }, contextValue) {
        return await contextValue.dataSources.models.InventoryMovement.findById(id).populate('item');
    },
    
    async InventoryMovements(_, {limit = 999, skip = 0 , sort_field = '_id', sort_order = 1}, contextValue) {
        return await contextValue.dataSources.models.InventoryMovement.find({},null,{skip: skip, limit:limit}).populate('item').exec()
    },
    
    async InventoryMovementFullData(_, { id }, contextValue) {
        return await contextValue.dataSources.models.InventoryMovement.findById(id).populate('item');
    },
};

export const Mutation = {
    addInventoryMovement: async (_, args , contextValue) => {
        const model = contextValue.dataSources.models.InventoryMovement;
        const movement = await model.create(args.inventoryMovementInput);
        
        return await model.findById(movement._id);
    },
    
    updateInventoryMovement: async (_, args, contextValue) => {
        const model = contextValue.dataSources.models.InventoryMovement;
        
        const movement = await model.findById(args.id);

        if (!movement) throw new GraphQLError(`El movimiento que deseas editar no existe.`, {extensions: {code: ApolloServerErrorCode.BAD_USER_INPUT}, argumentName: args.id});
        
        return model.findByIdAndUpdate(args.id, args.inventoryMovementInput, {new: true});
    },
    
    deleteInventoryMovement: async (_, { id }, contextValue) => {
        const model = contextValue.dataSources.models.InventoryMovement;
        const deletedMovement = await model.findOneAndDelete({_id: id});

        if (!deletedMovement) throw new GraphQLError(`El movimiento item que deseas eliminar no existe.`, {extensions: {code: ApolloServerErrorCode.BAD_USER_INPUT}, argumentName: id});

        return deletedMovement;
    },
};
