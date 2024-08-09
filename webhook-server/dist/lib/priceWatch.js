"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.setupWatcher = setupWatcher;
class TokenPriceWatcher {
    constructor(intervalMs = 5000) {
        this.intervalMs = intervalMs;
        this.url = "https://hermes.pyth.network/v2/updates/price/latest";
        this.watchOptions = new Map();
        this.intervalId = null;
    }
    addWatchOption(options) {
        this.watchOptions.set(options.tokenToWatch, options);
    }
    removeWatchOption(tokenId) {
        this.watchOptions.delete(tokenId);
        if (this.watchOptions.size === 0) {
            this.stop();
        }
    }
    start() {
        if (this.intervalId) {
            console.log("Watcher is already running");
            return;
        }
        this.intervalId = setInterval(() => this.fetchPriceData(), this.intervalMs);
        console.log("Watcher started");
    }
    stop() {
        if (this.intervalId) {
            clearInterval(this.intervalId);
            this.intervalId = null;
            console.log("Watcher stopped");
        }
    }
    fetchPriceData() {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const tokenIds = Array.from(this.watchOptions.keys());
                if (tokenIds.length === 0) {
                    this.stop();
                    return;
                }
                const params = new URLSearchParams();
                tokenIds.forEach((id) => params.append("ids[]", id));
                console.log("params", params);
                console.log("url", `${this.url}?${params.toString()}`);
                const response = yield fetch(`${this.url}?${params.toString()}`);
                if (!response.ok) {
                    throw new Error(`HTTP error! status: ${response.status}`);
                }
                const data = yield response.json();
                console.log("response", data);
                const priceData = data.parsed;
                priceData.forEach((data) => this.checkPrice(data));
            }
            catch (error) {
                console.error("Error fetching price data:", error);
            }
        });
    }
    checkPrice(data) {
        console.log("I got called", data.id);
        console.log("this watch options", this.watchOptions);
        const options = this.watchOptions.get(`0x${data.id}`);
        console.log("options", options);
        if (!options)
            return;
        console.log("there are options");
        const currentPrice = parseFloat(data.price.price) * Math.pow(10, data.price.expo);
        const epsilon = 1e-8;
        if (Math.abs(currentPrice - options.priceToWatch) < epsilon ||
            currentPrice > options.priceToWatch) {
            console.log(`Price reached for token 0x${data.id}: ${currentPrice.toFixed(8)} (Target: ${options.priceToWatch})`);
            options.onPriceReached();
            this.removeWatchOption(`0x${data.id}`);
            console.log(`Stopped watching token 0x${data.id}`);
        }
    }
}
function setupWatcher(options) {
    return __awaiter(this, void 0, void 0, function* () {
        const watcher = new TokenPriceWatcher();
        watcher.addWatchOption(options);
        watcher.start();
    });
}
