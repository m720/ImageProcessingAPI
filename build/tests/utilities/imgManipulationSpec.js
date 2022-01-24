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
const imgManipulation_1 = __importDefault(require("../../utilities/imgManipulation"));
const fs_1 = __importDefault(require("fs"));
const supertest_1 = __importDefault(require("supertest"));
const index_1 = __importDefault(require("../../index"));
let outputImgDir = './public/output.jpg';
const request = (0, supertest_1.default)(index_1.default);
describe("functions test", () => {
    it("resize function", () => __awaiter(void 0, void 0, void 0, function* () {
        yield imgManipulation_1.default.resize(200, 300);
        let res = yield fs_1.default.existsSync(outputImgDir);
        expect(res).toBeTruthy();
    }));
});
describe("endpoint test", () => {
    it("resize endpoint", () => __awaiter(void 0, void 0, void 0, function* () {
        const res = yield request.get('/img/resize?x=400&y=300');
        expect(res.status).toBe(200);
    }));
    it("delete endpoint", () => __awaiter(void 0, void 0, void 0, function* () {
        const res = yield request.get('/img/delete');
        //expect(res.status).toBe(200);
        expect(fs_1.default.existsSync(outputImgDir)).toBeFalsy();
    }));
    it("resource creation after deleting", () => __awaiter(void 0, void 0, void 0, function* () {
        const res = yield request.get('/img/resize?x=400&y=300');
        expect(res.status).toBe(200);
    }));
});
