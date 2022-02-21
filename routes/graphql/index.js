const express = require('express');
const cookieParser = require("cookie-parser");
const { ApolloServer } = require('apollo-server-express');
const  authService = require("./../../services/auth");
const generateUserService = require("../../services/user");
const generateOrganizationService = require("../../services/organization");
const { GraphQLUpload, graphqlUploadExpress} = require('graphql-upload');
const { ApolloServerPluginLandingPageGraphQLPlayground, ApolloServerPluginLandingPageDisabled } = require('apollo-server-core');

const {getCorsConfig} = require("./../../loaders/cors");

const router = express.Router();

const {typeDefs,resolvers} = require("./schema");

const buildContext = async ({req,res}) => {
  const TOKEN_NAME = process.env.ACCESS_TOKEN_COOKIE_KEY;
  let token = null;


  //Check for token in the authorization header
  if (req.headers.authorization?.split(' ')[0] === 'Bearer') {
    token =  req.headers.authorization.split(' ')[1];
  } else if(req.cookies[TOKEN_NAME]){
    token = req.cookies[TOKEN_NAME];
  }

  let user = await authService.getUserForAccessToken(token);
  return {
    user,
    accessToken: token,
    services: {
      UserService: generateUserService({user,accessToken: token}),
      OrganizationService: generateOrganizationService({user, accessToken: token}),
    }
  };

};

const getPlaygroundConfig = () => {
  if(process.env.NODE_ENV === "production-local" || process.env.NODE_ENV === "development") {
    return {
      endpoint: "/graphql"
    }
  }else if(process.env.NODE_ENV === "production") {
    return null;
  }
};

const getPlugins = () => {
   if(process.env.NODE_ENV === "production-local" || process.env.NODE_ENV === "development") {
    return [ApolloServerPluginLandingPageGraphQLPlayground()]
  }else if(process.env.NODE_ENV === "production") {
    return [ApolloServerPluginLandingPageDisabled()];
  }
};


router.use(cookieParser());
router.use(graphqlUploadExpress());

const server = new ApolloServer({
  typeDefs,
  resolvers,
  plugins: getPlugins(),
  // playground: getPlaygroundConfig(),
  context: buildContext,
  formatError: (err) => {
    return {
        message: err.originalError.message,
        code: err.originalError.statusCode ?? 500
    };

  }
});

(async () => {
  await server.start();
  server.applyMiddleware({
    app:router,
    path: "/",
    cors: getCorsConfig()
  });
})();



module.exports = router;