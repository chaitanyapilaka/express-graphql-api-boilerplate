const {Client,envs} = require('stytch');

const stytchAdminClient = new Client({
    project_id: process.env.STYTCH_PROJECT_ID,
    secret: process.env.STYTCH_SECRET_KEY,
    env: (process.env.NODE_ENV === "production" || process.env.NODE_ENV === "production-local") ? envs.live : envs.test
});

module.exports =  stytchAdminClient;