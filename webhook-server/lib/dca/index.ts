import { fork } from "child_process";
import cron from "node-cron";
import buildCronExpression from "../utils/buildCronExpression";
import fs from "fs";
import path from "path";
export class DCAEngine {
  jobs: Map<any, any>;
  logFilePath: string;
  constructor() {
    this.jobs = new Map();
    this.logFilePath = path.join(__dirname, "job-scheduler.log");
  }

  scheduleJob(jobConfig: Record<string, any>) {
    const {
      jobId,
      tokenSymbol,
      contractAddress,
      totalAmount,
      numberOfOrders,
      cronSchedule,
    } = jobConfig;

    const amountPerOrder = totalAmount / numberOfOrders;
    const cronExpression = buildCronExpression(cronSchedule);
    const logContent = `
      Job Scheduled:
      - Job ID: ${jobId}
      - Token Symbol: ${tokenSymbol}
      - Contract Address: ${contractAddress}
      - Total Amount: ${totalAmount}
      - Number of Orders: ${numberOfOrders}
      - Cron Schedule: ${cronSchedule}
      - Timestamp: ${new Date().toISOString()}
    `;

    this.writeLog(logContent);
    let ordersExecuted = 0;
    cron.schedule;
    const job = cron.schedule(cronExpression, () => {
      if (ordersExecuted >= numberOfOrders) {
        console.log(
          `All orders for job ${jobId} have been executed. Stopping job.`,
        );
        this.stopJob(jobId);
        return;
      }

      console.log(
        `Executing DCA trade for job ${jobId} (${ordersExecuted + 1}/${numberOfOrders})`,
      );
      const child = fork(path.join(__dirname, "../utils/executeDCAOrder"));

      child.send({
        tokenSymbol,
        contractAddress,
        amount: amountPerOrder,
      });

      child.on("message", (result) => {
        console.log(`Trade result for ${jobId}:`, result);
        ordersExecuted++;
      });
    });

    this.jobs.set(jobId, job);
    console.log(
      `Scheduled DCA job ${jobId} for ${totalAmount} ${tokenSymbol} split into ${numberOfOrders} orders every ${cronSchedule}`,
    );
  }

  stopJob(jobId: string) {
    const job = this.jobs.get(jobId);
    if (job) {
      job.stop();
      this.jobs.delete(jobId);
      console.log(`Stopped DCA job ${jobId}`);
    } else {
      console.log(`No job found with ID ${jobId}`);
    }
  }
  writeLog(logContent: string) {
    fs.appendFile(this.logFilePath, logContent + "\n", (err) => {
      if (err) {
        console.error("Error writing to log file", err);
      } else {
        console.log("Job scheduled and logged successfully");
      }
    });
  }
}
