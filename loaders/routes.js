const express = require('express');
const authRoutes = require("../routes/auth");
const adminRoutes = require("../routes/admin");
const webhooksRoutes = require("../routes/webhooks");
const graphqlRoutes = require("../routes/graphql");
const defaultRoutes = require("../routes/default");

module.exports = async ({app}) => {
    app.use("/public",express.static('public'));
    app.use(defaultRoutes);
    app.use("/admin",adminRoutes);
    app.use("/auth",authRoutes);
    app.use("/webhooks",webhooksRoutes);
    app.use("/graphql",graphqlRoutes);

    app.get("/warmup",(req,res) => {
        res.send(`${process.env.PROJECT_NAME}: It's gettin' hot in here...so take off all your clothes!`);
    });
    return app;
};