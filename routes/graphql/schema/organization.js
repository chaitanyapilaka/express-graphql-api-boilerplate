const {gql} = require("apollo-server-express");

const typeDef = gql`    
    
    type Organization {
        id: ID!
        name: String
        users: [User!]
    }
    
    input CreateOrganizationInput {
        name: String!
    }
    
    type CreateOrganizationPayload {
        organization: Organization!
    }
    
    extend type Query {
        organization(id: ID!): Organization!
    }
    
    extend type Mutation {
        createOrganization(input: CreateOrganizationInput!): CreateOrganizationPayload!
    }
    
`;


const resolvers = {
    Organization: {
        id: async (parent,args,context) => {
           return parent.id ? parent.id.toString() : parent._id;
        }
    },
    Query: {
        organization: async (parent,args,context) => {
            const {id} = args;
            let organization = await context.services.OrganizationService.getOrganizationById(id);
            return organization;
        }
    },
    Mutation: {
        createOrganization: async (parent,args,context) => {
            let organization = await context.services.OrganizationService.createOrganization(args.input);
            return {organization};
        }
    }

};



module.exports = {
    typeDef,
    resolvers
};