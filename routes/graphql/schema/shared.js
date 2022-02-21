const {gql} = require("apollo-server-express");

const typeDef = gql`    
    
    interface Node {
        id: ID!
    }
    
    type PageInfo {
        hasNextPage: Boolean!
        totalCount: Int
    }
`;

const resolvers = {
    Node: {
        __resolveType: (parent,args,context,info) => {
            return parent;
        }
    }
};

module.exports = {
    typeDef,
    resolvers
};