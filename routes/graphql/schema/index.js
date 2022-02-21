const {merge} = require("lodash");

const {typeDef : rootSchema, resolvers : rootResolvers} = require("./root");
const {typeDef : sharedSchema, resolvers : sharedResolvers} = require("./shared");
const {typeDef : organizationSchema, resolvers : organizationResolvers} = require("./organization");
const {typeDef : userSchema, resolvers : userResolvers} = require("./user");


const typeDefs = [
    rootSchema,
    sharedSchema,
    organizationSchema,
    userSchema,
];

const resolvers = merge(
    rootResolvers,
    sharedResolvers,
    organizationResolvers,
    userResolvers,
);

module.exports = {
  typeDefs,
  resolvers
};