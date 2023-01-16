"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.server = void 0;
const http_1 = require("http");
const userController_1 = require("./user/userController");
const sendResponse_1 = require("./utils/sendResponse");
const errors_1 = require("./utils/constants/errors");
const checkUUID_1 = require("./utils/checkUUID");
const port_1 = require("./utils/port");
exports.server = (0, http_1.createServer)((req, res) => {
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
});
exports.server.listen(port_1.PORT, () => console.log(`Server running on port ${port_1.PORT}`));
//# sourceMappingURL=index.js.map