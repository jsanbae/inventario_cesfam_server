import { ApolloServerErrorCode } from '@apollo/server/errors';
import { GraphQLError } from 'graphql';
import AuthenticationCheck from './../../utils/auth.js';

export const Query = {
    async Item(_, { id }, contextValue) {
        contextValue.authUser();
        return await contextValue.dataSources.models.Item.findById(id);
    },

    async Items(_, { pattern = null, skip = 0 , limit = null, sort_field = '_id', sort_order = 1}, contextValue) {
        contextValue.authUser();
        let query = {};
        let queryOptions = {skip: skip, sort: {[sort_field]: sort_order}};
        
        if (limit) queryOptions.limit = limit;
        if (pattern) query = { $or: [ { internal_code: { $regex: pattern, $options: 'i' } }, { name: { $regex: pattern, $options: 'i' } } ] };

        return await contextValue.dataSources.models.Item.find(query, null, queryOptions).exec();
    },
    
    async ItemFullData(_, { id }, contextValue) { 
        return await contextValue.dataSources.models.Item.findById(id);
    }
};

export const Mutation = {
    async addItem(_, args, contextValue) {
        const model = contextValue.dataSources.models.Item;
        
        const item_exists = await model.findOne({internal_code : args.itemInput.internal_code}).count();

        if (item_exists) throw new GraphQLError(`El código interno ${args.itemInput.internal_code} ya existe, favor utilizar un código diferente.`, {extensions: {code: ApolloServerErrorCode.BAD_USER_INPUT}, argumentName: args.internal_code});
        
        return model.create(args.itemInput);
    },

    async updateItem(_, args, contextValue) {
        const model = contextValue.dataSources.models.Item;
        
        const item = await model.findOne({_id: new ObjectId(id)});

        if (!item) throw new GraphQLError(`El item que deseas editar no existe.`, {extensions: {code: ApolloServerErrorCode.BAD_USER_INPUT}, argumentName: args.id});
        
        return model.findByIdAndUpdate(args.id, args.itemInput, {new: true});
    },
    
    async deleteItem(_, { id }, contextValue) {
        const model = contextValue.dataSources.models.Item;
        // const deleted = await model.findOneAndDelete({_id: new ObjectId(id)});
        const deleted = await model.findOneAndDelete({_id: id});

        if (!deleted) throw new GraphQLError(`El item que deseas eliminar no existe.`, {extensions: {code: ApolloServerErrorCode.BAD_USER_INPUT}, argumentName: id});

        return {id: id, name: deleted.name};
    },
};