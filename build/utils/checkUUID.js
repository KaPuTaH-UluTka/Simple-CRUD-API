"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.checkUUID = void 0;
const uuid_1 = require("uuid");
function checkUUID(id) {
    return (0, uuid_1.validate)(id) && (0, uuid_1.version)(id) === 4;
}
exports.checkUUID = checkUUID;
//# sourceMappingURL=checkUUID.js.map