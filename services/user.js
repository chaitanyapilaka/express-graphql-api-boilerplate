const User = require("./../models/user");

const generateUserService = ({ user: userAuth }) => ({
    getCurrentUser: async () => {
        let user = await User.findById(userAuth.id)
             .populate({
                 path: 'organization',
                 populate: {
                     path: 'projects'
                 }
             }).exec();
        return user;
    }
});

module.exports = generateUserService;