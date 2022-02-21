function errorHandler(error,req,res, next) {
     return res.status(error.statusCode ?? 500).send({
            code: error.code ?? 500,
            message: error.message
     });
}


module.exports = async ({app}) => {
    app.use(errorHandler);
    return app;
};