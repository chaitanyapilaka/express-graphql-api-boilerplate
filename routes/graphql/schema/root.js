const {gql} = require("apollo-server-express");
const AdminService = require("./../../../services/admin");
const { GraphQLUpload} = require('graphql-upload');

const typeDef = gql`
    
    scalar Upload
    
    type File {
        filename: String!
        mimetype: String!
        encoding: String!
    }
    type Query {
        _empty: String
        getSignedUrl(filename: String): String!
    }
    type Mutation {
        _empty: String
    }
`;

const resolvers = {
  Upload: GraphQLUpload,
  Query : {
      _empty: () => { return "rootQuery"; },
      getSignedUrl: async (parent,args,context) => {
          const {filename} = args;
          let signedUrl = await AdminService.generateSignedUrl(filename);
          return signedUrl;
      }
  },
  Mutation: {
      _empty: () => { return "rootMutation"; },
  }
};

module.exports = {
    typeDef,
    resolvers
};