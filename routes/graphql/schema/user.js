const {gql} = require("apollo-server-express");

const typeDef = gql`   
    
    type User {
        id: ID!
        firstName: String!
        lastName: String!
        phone: String!
        email: String!
        organization: Organization!
    }
    
    type UserConnection {
        edges: [UserConnectionEdge!]!
        pageInfo: PageInfo!
    }
    
    type UserConnectionEdge {
        cursor: String!
        node: User!
    }
    
    extend type Query {
        me: User!
    }
    
`;


const resolvers = {
    User: {
        id: async (parent,args,context) => {
           return parent.id ? parent.id.toString() : parent._id;
        }
    },
    Query: {
        me: async (parent,args,context) => {
            let user = await context.services.UserService.getCurrentUser();
            return user;
        }
    }
};



module.exports = {
    typeDef,
    resolvers
};