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
const cluster_1 = __importDefault(require("cluster"));
const os_1 = require("os");
const http_1 = require("http");
const userController_1 = require("./user/userController");
const sendResponse_1 = require("./utils/sendResponse");
const errors_1 = require("./utils/constants/errors");
const checkUUID_1 = require("./utils/checkUUID");
const userModel_1 = require("./user/userModel");
const port_1 = require("./utils/port");
const requestSplitter_1 = require("./utils/requestSplitter");
const server = (0, http_1.createServer)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    if (cluster_1.default.isPrimary) {
        console.log('primary');
        yield (0, requestSplitter_1.requestSplitter)(req, res);
    }
    else {
        console.log('worker');
        if (!req.url)
            return;
        if (req.url === '/api/users') {
            if (req.method === 'GET')
                return (0, userController_1.getUsers)(req, res);
            if (req.method === 'POST')
                return (0, userController_1.createUser)(req, res);
        }
        const id = req.url.split('/').splice(-1, 1).join();
        if (id) {
            if (!(0, checkUUID_1.checkUUID)(id))
                return (0, sendResponse_1.sendResponse)(400, { error: errors_1.ERRORS.invalidId400 }, res);
            if (req.method === 'GET')
                return (0, userController_1.getUser)(req, res, id);
            if (req.method === 'PUT')
                return (0, userController_1.updateUser)(req, res, id);
            if (req.method === 'DELETE')
                return (0, userController_1.deleteUser)(req, res, id);
        }
        (0, sendResponse_1.sendResponse)(404, { error: errors_1.ERRORS.base404 }, res);
    }
}));
const multi = () => __awaiter(void 0, void 0, void 0, function* () {
    var _a, _b;
    const numOfCpus = (0, os_1.cpus)().length;
    process.on('message', (msg) => {
        userModel_1.users.length = 0;
        msg.forEach((e) => userModel_1.users.push(e));
    });
    if (cluster_1.default.isPrimary) {
        const workers = [];
        server.listen(port_1.PORT, () => {
            console.log(`Primary pid:${process.pid}, server running on port: ${port_1.PORT}`);
        });
        console.log(`Starting ${numOfCpus} workers`);
        for (let i = 0; i < numOfCpus; i++) {
            const worker = cluster_1.default.fork();
            workers.push(worker);
            worker.on('message', ({ pid, users }) => {
                workers.forEach((el) => {
                    !el.isDead() && el.process.pid !== pid && el.send(users);
                });
            });
        }
        cluster_1.default.on('message', (worker, msg) => {
            userModel_1.users.length = 0;
            msg.users.forEach((e) => userModel_1.users.push(e));
        });
        cluster_1.default.on('exit', (worker) => {
            console.log(`Worker ${worker.process.pid} stopped`);
        });
    }
    else {
        const id = (_a = cluster_1.default.worker) === null || _a === void 0 ? void 0 : _a.id;
        const MULTI_PORT = port_1.PORT + Number((_b = cluster_1.default.worker) === null || _b === void 0 ? void 0 : _b.id);
        server.listen(MULTI_PORT, () => console.log(`Server running on port ${MULTI_PORT}`));
        console.log(`Worker: ${id}, pid: ${process.pid}`);
    }
});
multi();
//# sourceMappingURL=multi.js.map