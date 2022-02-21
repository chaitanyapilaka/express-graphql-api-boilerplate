if(process.env.NODE_ENV === "production" || process.env.NODE_ENV === "production-local"){
  require('dotenv').config({ path: `.env.production` });
}else{
  require('dotenv').config({ path: `.env.development` });
}


const express = require('express');
const {corsLoader} = require("./loaders/cors");
const mongooseLoader = require("./loaders/mongoose");
const routesLoader = require("./loaders/routes");
const errorsLoader = require("./loaders/errors");
const PORT = process.env.PORT ?? 3000;
const cluster = require('cluster');

const startServer = async () => {
  const app = express();
  await corsLoader({app});
  await mongooseLoader({app});
  await routesLoader({app});
  await errorsLoader({app});

  app.listen(PORT, () => {
    console.log(`${process.env.PROJECT_NAME} listening on port:${PORT}`)
  });
};


// Clustering
if (cluster.isMaster) {
  let totalCPUs = 2;

  if(process.env.NODE_ENV === "production"){
    totalCPUs = require('os').cpus().length;
  }

  console.log(`Number of CPUs is ${totalCPUs}`);
  console.log(`Master ${process.pid} is running`);

  // Fork workers.
  for (let i = 0; i < totalCPUs; i++) {
    cluster.fork();
  }

  cluster.on('exit', (worker, code, signal) => {
    console.log(`worker ${worker.process.pid} died`);
    console.log("Let's fork another worker!");
    cluster.fork();
  });

} else {
  startServer();
}





