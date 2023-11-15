import { ApolloServerErrorCode } from '@apollo/server/errors';
import { GraphQLError } from 'graphql';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';

export const Query = {
    user: (_, {id}) => User.findById(id),
    users: (_, args) => User.find(),    
    async viewer(_, {user_id}) {
        let user = await User.findById(user_id);
        return user;
    }
}

export const Mutation = {
    async registerUser(_, {registerInput: {email, password, name, role, photo} }, contextValue) {

        const user_exists = await contextValue.dataSources.models.User.findOne({ email });

        if (user_exists) throw new GraphQLError('A user is already registered with the email: ' + email, {extensions: {code: ApolloServerErrorCode.BAD_USER_INPUT}, argumentName: email});
            
        let encryptedPassword = await bcrypt.hash(password, 10);
            
        const newUser = await contextValue.dataSources.models.User.create({
            name: name,
            email: email.toLowerCase(),
            password: encryptedPassword,
            role: role,
            photo: photo
        });

        const token = jwt.sign(
            { id: user._id, email: email, name: user.name, role: user.role },
            process.env.JWT_SECRET, 
            {expiresIn: "2h",}
        );
        
        newUser.token = token;
        await newUser.save();
            
        return newUser;
    },

    async loginUser(_, {loginInput: {email, password} }, contextValue) {
        contextValue.authUser();
        let user = await contextValue.dataSources.models.User.findOne({ email: email });
        const is_password_correct = await bcrypt.compare(password, user.password);
        
        if (!user || !is_password_correct) throw new GraphQLError("Password is incorrect or User doesn't exits", {extensions: {code: ApolloServerErrorCode.BAD_USER_INPUT}, argumentName: email});
        
        // Create token
        const token = jwt.sign(
            { id: user._id, email: email, name: user.name, role: user.role },
            process.env.JWT_SECRET,
            { algorithm: "HS256", expiresIn: "2h" }
        );
        
        // save token
        user.token = token;
        await user.save();

        return user;
    },

    async logoutUser(_, {id}, contextValue) {
        let user = await contextValue.dataSources.models.User.findById(id);
        user.token = null;
        await user.save();
        return user;
    }
}
