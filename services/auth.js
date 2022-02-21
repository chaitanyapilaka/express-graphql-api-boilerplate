const {decodeAccessToken} = require("../lib/jwt");
const stytchAdminClient = require('../lib/stytch');
const jwt = require("jsonwebtoken");
const User = require("./../models/user");

const login = async (email) => {

   const params = {
    email: email,
    login_magic_link_url: `${process.env.API_URL}/auth/login/callback`,
    signup_magic_link_url: `${process.env.API_URL}/auth/login/callback`,
  };

   try{
       const response = await stytchAdminClient.magicLinks.email.loginOrCreate(params);
       return response;
   }catch (e) {
       console.error(e);
       return false;
   }

};

const loginCallback = async (token) => {
    try {
        const response = await stytchAdminClient.magicLinks.authenticate(token);
        let user = await getUserByStytchId(response.user_id);
        if(user){
            let token = jwt.sign({
                    email: user.email,
                    exp: Math.floor(Date.now() / 1000) + 60 * 60 * 24 * process.env.SESSION_LENGTH_IN_DAYS
                },
                process.env.JWT_ACCESS_TOKEN_SECRET
            );
            return token;
        }
        return null;
    }catch (e) {
        console.error(e);
        return false;
    }
};

const validateAccessToken = async (token) => {
    try {
        let decoded = jwt.verify(token, process.env.JWT_ACCESS_TOKEN_SECRET);
        return true;
    }catch (e) {
        return false;
    }
};

async function getUserByStytchId(id) {
  try{
      let user = await User.findOne({stytchUserId: id});
      if(!user) {
        throw new Error("User not found");
      }
      return user;
  }catch (e) {
      return null;
  }
}


async function getUserForAccessToken(token) {
  try{
      let decoded = await decodeAccessToken(token);
      let user = await User.findOne({email: decoded.email}).populate("organization").exec();

      if(!user) {
        throw new Error("User not found");
      }
      return user;
  }catch (e) {
      return null;
  }
}

function isSuperAdmin(user,accessToken) {
  if(user?.role === "super-admin" || accessToken === process.env.SUPER_ADMIN_API_KEY){
    return true;
  }
  return false;
}

function isOwner(user,{project, organization} = {}) {


    if(!user) {
        return false;
    }

    let ownedOrganization = user.organization.id;
    let ownedProjects = user.organization.projects;
    if(organization && ownedOrganization !== organization){
        return false;
    }

    if(project && !ownedProjects.includes(project)) {
        return false;
    }

    return true;

}




module.exports = {
    login,
    loginCallback,
    validateAccessToken,
    getUserForAccessToken,
    isSuperAdmin,
    isOwner
};