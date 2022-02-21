const mongoose = require("mongoose");

// Global setup for mongoose - convert all object ids to string

const initializeMongoose = async (uri, callback) => {

    try{
        await mongoose.connect(process.env.DATABASE_URI, {
            maxPoolSize: 10,
            autoIndex: true,
            useUnifiedTopology: true,
            useNewUrlParser: true,
        });
    }catch (e) {
        console.error(e);
    }
};


module.exports = async ({app}) => {
    await initializeMongoose();
    return app;
};