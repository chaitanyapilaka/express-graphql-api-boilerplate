const jwt = require('jsonwebtoken');

const generateAccessToken = async (userId,role) => {
    let token = await jwt.sign({
        data: {
            userId,
            role
        }
    },process.env.JWT_ACCESS_TOKEN_SECRET,{expiresIn: '30d',issuer: process.env.PROJECT_ID});
    return token;
};

const decodeAccessToken = async (token) => {
    let decoded = await jwt.verify(token,process.env.JWT_ACCESS_TOKEN_SECRET,{algorithm:"HS256"});
    return decoded;
};

module.exports = {
    generateAccessToken,
    decodeAccessToken
};