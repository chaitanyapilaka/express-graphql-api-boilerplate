const cors = require("cors");

const corsLoader = async ({app}) => {
    app.use(cors(getCorsConfig()));
    return app;
};

const getCorsConfig = () => {
    if(process.env.NODE_ENV === "production-local" || process.env.NODE_ENV === "development"){
        return {
            origin: ["http://localhost:8080","http://localhost:3000"],
            credentials: true
        }
    }else if(process.env.NODE_ENV === "production"){
          return {
            origin: new RegExp(`^(.*\.|)${process.env.PROJECT_ROOT_DOMAIN}$`),
            credentials: true
          }
    }
};

module.exports = {
    corsLoader,
    getCorsConfig
};

