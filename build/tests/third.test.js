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
const supertest_1 = __importDefault(require("supertest"));
const index_1 = require("../index");
const uuid_1 = require("uuid");
describe('third scenario', () => {
    afterAll(() => __awaiter(void 0, void 0, void 0, function* () {
        return new Promise((res) => {
            index_1.server.close(() => res());
        });
    }));
    it('Server should answer with status code 200', () => __awaiter(void 0, void 0, void 0, function* () {
        const res = yield (0, supertest_1.default)(index_1.server).get('/api/users');
        expect(res.statusCode).toBe(200);
    }));
    it('Server should answer with status code 400 and corresponding message if userId is invalid (not uuid)', () => __awaiter(void 0, void 0, void 0, function* () {
        const MY_NAMESPACE = (0, uuid_1.v4)();
        const id = (0, uuid_1.v5)('Mike', MY_NAMESPACE);
        const res = yield (0, supertest_1.default)(index_1.server).get(`/api/users/${id}`);
        expect(res.statusCode).toBe(400);
    }));
    it('Server should answer with status code 400 and corresponding message if request body does not contain required fields', () => __awaiter(void 0, void 0, void 0, function* () {
        const res = yield (0, supertest_1.default)(index_1.server).post(`/api/users`).send({ username: 'Mike', age: 25 });
        expect(res.statusCode).toBe(400);
    }));
});
//# sourceMappingURL=third.test.js.map