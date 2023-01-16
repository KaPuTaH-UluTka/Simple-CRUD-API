"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteUserById = exports.updateUserById = exports.findUserById = exports.createNewUser = exports.findAllUsers = void 0;
const uuid_1 = require("uuid");
const userModel_1 = require("./userModel");
const process_1 = require("process");
function findAllUsers() {
    return new Promise((resolve) => {
        var _a;
        (_a = process.send) === null || _a === void 0 ? void 0 : _a.call(process, { users: userModel_1.users, pid: process_1.pid });
        resolve(userModel_1.users);
    });
}
exports.findAllUsers = findAllUsers;
function createNewUser(newUser) {
    return new Promise((resolve) => {
        var _a;
        const createdNewUser = Object.assign({ id: (0, uuid_1.v4)() }, newUser);
        userModel_1.users.push(createdNewUser);
        (_a = process.send) === null || _a === void 0 ? void 0 : _a.call(process, { users: userModel_1.users, pid: process_1.pid });
        resolve(createdNewUser);
    });
}
exports.createNewUser = createNewUser;
function findUserById(id) {
    return new Promise((resolve) => {
        var _a;
        const foundUser = userModel_1.users.find((user) => user.id === id);
        (_a = process.send) === null || _a === void 0 ? void 0 : _a.call(process, { users: userModel_1.users, pid: process_1.pid });
        resolve(foundUser);
    });
}
exports.findUserById = findUserById;
function updateUserById(id, updatedUser) {
    return new Promise((resolve) => {
        var _a;
        const index = userModel_1.users.findIndex((user) => user.id === id);
        userModel_1.users[index] = Object.assign({ id }, updatedUser);
        (_a = process.send) === null || _a === void 0 ? void 0 : _a.call(process, { users: userModel_1.users, pid: process_1.pid });
        resolve(userModel_1.users[index]);
    });
}
exports.updateUserById = updateUserById;
function deleteUserById(id) {
    return new Promise((resolve) => {
        var _a;
        const index = userModel_1.users.findIndex((user) => user.id === id);
        userModel_1.users.splice(index, 1);
        (_a = process.send) === null || _a === void 0 ? void 0 : _a.call(process, { users: userModel_1.users, pid: process_1.pid });
        resolve(true);
    });
}
exports.deleteUserById = deleteUserById;
//# sourceMappingURL=userService.js.map