"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.DCAEngine = void 0;
const child_process_1 = require("child_process");
const node_cron_1 = __importDefault(require("node-cron"));
const buildCronExpression_1 = __importDefault(require("../utils/buildCronExpression"));
const fs_1 = __importDefault(require("fs"));
const path_1 = __importDefault(require("path"));
class DCAEngine {
    constructor() {
        this.jobs = new Map();
        this.logFilePath = path_1.default.join(__dirname, "job-scheduler.log");
    }
    scheduleJob(jobConfig) {
        const { jobId, tokenSymbol, contractAddress, totalAmount, numberOfOrders, cronSchedule, } = jobConfig;
        const amountPerOrder = totalAmount / numberOfOrders;
        const cronExpression = (0, buildCronExpression_1.default)(cronSchedule);
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
        const job = node_cron_1.default.schedule(cronExpression, () => {
            if (ordersExecuted >= numberOfOrders) {
                console.log(`All orders for job ${jobId} have been executed. Stopping job.`);
                this.stopJob(jobId);
                return;
            }
            console.log(`Executing DCA trade for job ${jobId} (${ordersExecuted + 1}/${numberOfOrders})`);
            const child = (0, child_process_1.fork)(path_1.default.join(__dirname, "../utils/executeDCAOrder"));
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
        console.log(`Scheduled DCA job ${jobId} for ${totalAmount} ${tokenSymbol} split into ${numberOfOrders} orders every ${cronSchedule}`);
    }
    stopJob(jobId) {
        const job = this.jobs.get(jobId);
        if (job) {
            job.stop();
            this.jobs.delete(jobId);
            console.log(`Stopped DCA job ${jobId}`);
        }
        else {
            console.log(`No job found with ID ${jobId}`);
        }
    }
    writeLog(logContent) {
        fs_1.default.appendFile(this.logFilePath, logContent + "\n", (err) => {
            if (err) {
                console.error("Error writing to log file", err);
            }
            else {
                console.log("Job scheduled and logged successfully");
            }
        });
    }
}
exports.DCAEngine = DCAEngine;
