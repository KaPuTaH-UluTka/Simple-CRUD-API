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
exports.getPostData = void 0;
const errors_1 = require("./constants/errors");
const sendResponse_1 = require("./sendResponse");
const getPostData = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    return new Promise((resolve, reject) => {
        try {
            let body = '';
            req.setEncoding('utf8');
            req
                .on('data', (chunk) => {
                body += chunk.toString();
            })
                .on('end', () => {
                try {
                    resolve(JSON.parse(body));
                }
                catch (error) {
                    if (error instanceof Error) {
                        (0, sendResponse_1.sendResponse)(400, {
                            message: errors_1.ERRORS.error400,
                        }, res);
                    }
                    reject(error);
                }
            });
        }
        catch (error) {
            (0, sendResponse_1.sendResponse)(500, {
                error: errors_1.ERRORS.error500,
            }, res);
            reject(error);
        }
    });
});
exports.getPostData = getPostData;
//# sourceMappingURL=getPostData.js.map