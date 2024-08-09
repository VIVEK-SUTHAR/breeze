"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = buildCronExpression;
function buildCronExpression(cronString) {
    if (!cronString || typeof cronString !== "string") {
        throw new Error("invalid");
    }
    const [range, unit] = cronString.split(" ");
    switch (unit.toUpperCase()) {
        case "MIN":
            // "1-60 MIN" -> "*/1 * * * *"
            return `*/${range} * * * *`;
        case "HOURS":
            // "1-24 HOURS" -> "0 */1 * * *"
            return `0 */${range} * * *`;
        case "DAYS":
            // "x DAYS" -> "0 0 */x * *"
            return `0 0 */${range} * *`;
        default:
            throw new Error("invalid");
    }
}
