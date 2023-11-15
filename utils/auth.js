import { GraphQLError } from 'graphql';

// optionally block the user
// we could also check user roles/permissions here
const AuthenticationCheck = (user) => {
    if (!user) {
        throw new GraphQLError('User is not authenticated', {
            extensions: {
                code: 'UNAUTHENTICATED',
                http: { status: 401 },
            },
        })
    }
    return;
}

export default AuthenticationCheck;