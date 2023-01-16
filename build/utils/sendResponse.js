"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.sendResponse = void 0;
const sendResponse = (status, message, res) => {
    res.writeHead(status, {
        'Content-Type': 'application/json',
    });
    res.end(JSON.stringify(message));
};
exports.sendResponse = sendResponse;
//# sourceMappingURL=sendResponse.js.map