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
exports.default = createRequest;
function createRequest(route, body, auth_token, api_url, custom_headers, queryParams, resInText) {
    return __awaiter(this, void 0, void 0, function* () {
        let url = `${api_url}${route}`;
        let token;
        if (queryParams) {
            const queryString = Object.entries(queryParams)
                .map(([key, value]) => `${encodeURIComponent(key)}=${encodeURIComponent(value)}`)
                .join("&");
            url += `?${queryString}`;
        }
        const res = yield fetch(url, {
            method: "POST",
            body: body && JSON.stringify(body),
            headers: Object.assign({ "content-type": "application/json", "API-KEY": auth_token }, custom_headers),
            cache: "no-cache",
        });
        if (res.status === 204) {
            return {};
        }
        if (!res.ok) {
            if (resInText) {
                throw new Error(yield res.text());
            }
            console.log(res.json());
            throw new Error(yield res.json());
        }
        let data;
        data = yield res.json();
        return data;
    });
}
