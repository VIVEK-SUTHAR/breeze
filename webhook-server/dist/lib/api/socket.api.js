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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.SocketApi = void 0;
const constants_1 = require("../constants");
const axios_1 = __importDefault(require("axios"));
class SocketApi {
    static getRoutes(fromChainId, toChainId, fromTokenAddress, toTokenAddress, fromAmount, recipient) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const params = {
                    fromChainId,
                    toChainId,
                    fromTokenAddress,
                    toTokenAddress,
                    fromAmount,
                    userAddress: constants_1.BREEZEGATEWAYADDRESS,
                    singleTxOnly: "true",
                    uniqueRoutesPerBridge: "false",
                    sort: "output",
                    recipient,
                    isContractCall: "true",
                };
                const queryString = new URLSearchParams(params).toString();
                console.log("query string", queryString);
                const data = yield axios_1.default.get(`${constants_1.SocketAPIURL}/quote?${queryString}`, {
                    headers: {
                        Accept: "application/json",
                        "API-KEY": constants_1.SOCKET_API_KEY,
                    },
                });
                console.log("this is data", data.data.result);
                return data.data.result;
            }
            catch (error) {
                console.log("error", error);
            }
        });
    }
    static buildTxn(route) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                console.log("this is sent route", route);
                const data = yield axios_1.default.post(`${constants_1.SocketAPIURL}/build-tx`, {
                    route: route,
                }, {
                    headers: {
                        Accept: "application/json",
                        "API-KEY": constants_1.SOCKET_API_KEY,
                    },
                });
                return data.data.result;
            }
            catch (error) {
                console.log("error", error);
            }
        });
    }
}
exports.SocketApi = SocketApi;
const fetchTxnData = (fromChainId, toChainId, fromTokenAddress, toTokenAddress, fromAmount, recipient) => __awaiter(void 0, void 0, void 0, function* () {
    const routes = yield SocketApi.getRoutes(fromChainId, toChainId, fromTokenAddress === "0x0000000000000000000000000000000000000000"
        ? "0xeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeee"
        : fromTokenAddress, toTokenAddress, fromAmount, recipient);
    console.log("routes", routes);
    if (routes) {
        const route = routes.routes[0];
        const txnData = yield SocketApi.buildTxn(route);
        return txnData;
    }
});
exports.default = fetchTxnData;
