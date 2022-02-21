
const Organization = require("./../models/organization");
const {isOwner,isSuperAdmin} = require("./auth");


const generateOrganizationService = ({ user: userAuth,accessToken }) => ({
    getOrganizationById: async (id) => {
        if(!isOwner(userAuth, {organization: id}) && !isSuperAdmin(userAuth,accessToken)){
            throw new Error("Permission Denied");
        }
        let organization = await Organization.findById(id);
        return organization;
    },
    createOrganization: async (params) => {
        if(!isSuperAdmin(userAuth,accessToken)){
            throw new Error("Permission Denied");
        }
        let organization = new Organization(params);
        await organization.save();
        return organization;
    },

});

module.exports = generateOrganizationService;