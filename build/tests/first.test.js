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
const __1 = require("..");
describe('first scenario', () => {
    let id;
    let user;
    afterAll(() => __awaiter(void 0, void 0, void 0, function* () {
        return new Promise((res) => {
            __1.server.close(() => res());
        });
    }));
    it('Get all records with a GET api/users request (an empty array is expected)', () => __awaiter(void 0, void 0, void 0, function* () {
        const res = yield (0, supertest_1.default)(__1.server).get('/api/users');
        expect(res.statusCode).toBe(200);
        expect(res.body).toEqual([]);
    }));
    it('A new object is created by a POST api/users request (a response containing newly created record is expected)', () => __awaiter(void 0, void 0, void 0, function* () {
        const res = yield (0, supertest_1.default)(__1.server)
            .post('/api/users')
            .send({
            username: 'Mike',
            age: 25,
            hobbies: ['implement crud api', 'job search'],
        });
        id = res.body.id;
        user = res.body;
        expect(res.statusCode).toBe(201);
        expect(res.body.username).toBe('Mike');
        expect(res.body.age).toBe(25);
        expect(res.body.hobbies).toEqual(['implement crud api', 'job search']);
    }));
    it('With a GET api/user/{userId} request, we try to get the created record by its id (the created record is expected)', () => __awaiter(void 0, void 0, void 0, function* () {
        const res = yield (0, supertest_1.default)(__1.server).get(`/api/users/${id}`);
        expect(res.statusCode).toBe(200);
        expect(res.body).toEqual(user);
    }));
    it('We try to update the created record with a PUT api/users/{userId} request (a response is expected containing an updated object with the same id)', () => __awaiter(void 0, void 0, void 0, function* () {
        const res = yield (0, supertest_1.default)(__1.server)
            .put(`/api/users/${id}`)
            .send({ username: 'Nick', age: 25, hobbies: ['implement crud api', 'job search'] });
        expect(res.statusCode).toBe(200);
        expect(res.body.username).not.toBe('Mike');
        expect(res.body.id).toBe(id);
    }));
    it('With a DELETE api/users/{userId} request, we delete the created object by id (confirmation of successful deletion is expected)', () => __awaiter(void 0, void 0, void 0, function* () {
        const res = yield (0, supertest_1.default)(__1.server).delete(`/api/users/${id}`);
        expect(res.statusCode).toBe(204);
    }));
    it('With a GET api/users/{userId} request, we are trying to get a deleted object by id (expected answer is that there is no such object)', () => __awaiter(void 0, void 0, void 0, function* () {
        const res = yield (0, supertest_1.default)(__1.server).get(`/api/users/${id}`);
        expect(res.statusCode).toBe(404);
    }));
});
//# sourceMappingURL=first.test.js.map