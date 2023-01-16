"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.checkHost = void 0;
const checkHost = (host) => {
    const portIndex = host.indexOf(':');
    if (portIndex > -1)
        return host.slice(0, portIndex);
    return host;
};
exports.checkHost = checkHost;
//# sourceMappingURL=checkHost.js.map