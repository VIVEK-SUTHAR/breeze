import cluster from "cluster";
import os from "os";
import express from "express";
import bodyParser from "body-parser";
import { Request, Response } from "express";
import { registerLimitOrder } from "./lib/limit-order";
import { initializeHashMap } from "./lib/utils/chainTokensMap";

const PORT = 3000;

if (cluster.isPrimary) {
  const numCPUs = os.cpus().length;
  console.log(`${numCPUs} Workers started`);
  for (let i = 0; i < numCPUs; i++) {
    cluster.fork();
  }
  cluster.on("exit", (worker, code, signal) => {
    console.log(`Worker ${worker.process.pid} died`);
  });
} else {
  const app = express();
  initializeHashMap();
  app.use(bodyParser.json());
  app.post("/webhook", (req: Request, res: Response) => {
    registerLimitOrder(req, res);
  });
  app.listen(PORT, () => {
    console.log(`Worker ${process.pid} started on port ${PORT}`);
  });
}
