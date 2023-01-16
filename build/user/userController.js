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
exports.deleteUser = exports.updateUser = exports.getUser = exports.createUser = exports.getUsers = void 0;
const userService_1 = require("./userService");
const sendResponse_1 = require("../utils/sendResponse");
const errors_1 = require("../utils/constants/errors");
const getPostData_1 = require("../utils/getPostData");
const getUsers = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const foundUsers = yield (0, userService_1.findAllUsers)();
        (0, sendResponse_1.sendResponse)(200, foundUsers, res);
    }
    catch (error) {
        (0, sendResponse_1.sendResponse)(500, {
            error: errors_1.ERRORS.error500,
        }, res);
    }
});
exports.getUsers = getUsers;
const createUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const body = yield (0, getPostData_1.getPostData)(req, res);
        const { username, age, hobbies } = body;
        if (!username || !age || !hobbies)
            return (0, sendResponse_1.sendResponse)(400, { error: errors_1.ERRORS.post400 }, res);
        const newUser = {
            username,
            age,
            hobbies,
        };
        const createdNewUser = yield (0, userService_1.createNewUser)(newUser);
        (0, sendResponse_1.sendResponse)(201, createdNewUser, res);
    }
    catch (error) {
        (0, sendResponse_1.sendResponse)(500, {
            error: errors_1.ERRORS.error500,
        }, res);
    }
});
exports.createUser = createUser;
const getUser = (req, res, id) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const foundUser = yield (0, userService_1.findUserById)(id);
        if (!foundUser)
            return (0, sendResponse_1.sendResponse)(404, { error: errors_1.ERRORS.user404 }, res);
        (0, sendResponse_1.sendResponse)(200, foundUser, res);
    }
    catch (error) {
        (0, sendResponse_1.sendResponse)(500, {
            error: errors_1.ERRORS.error500,
        }, res);
    }
});
exports.getUser = getUser;
const updateUser = (req, res, id) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const foundUser = yield (0, userService_1.findUserById)(id);
        if (!foundUser)
            return (0, sendResponse_1.sendResponse)(404, { error: errors_1.ERRORS.user404 }, res);
        const body = yield (0, getPostData_1.getPostData)(req, res);
        const { username, age, hobbies } = body;
        if (!username || !age || !hobbies)
            return (0, sendResponse_1.sendResponse)(400, { error: errors_1.ERRORS.post400 }, res);
        const currentUser = {
            username: username || foundUser.username,
            age: age || foundUser.age,
            hobbies: hobbies || foundUser.hobbies,
        };
        const updatedUser = yield (0, userService_1.updateUserById)(id, currentUser);
        (0, sendResponse_1.sendResponse)(200, updatedUser, res);
    }
    catch (error) {
        (0, sendResponse_1.sendResponse)(500, {
            error: errors_1.ERRORS.error500,
        }, res);
    }
});
exports.updateUser = updateUser;
const deleteUser = (req, res, id) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const foundUser = yield (0, userService_1.findUserById)(id);
        if (!foundUser)
            return (0, sendResponse_1.sendResponse)(404, { error: errors_1.ERRORS.user404 }, res);
        yield (0, userService_1.deleteUserById)(id);
        (0, sendResponse_1.sendResponse)(204, {}, res);
    }
    catch (error) {
        (0, sendResponse_1.sendResponse)(500, {
            error: errors_1.ERRORS.error500,
        }, res);
    }
});
exports.deleteUser = deleteUser;
//# sourceMappingURL=userController.js.map