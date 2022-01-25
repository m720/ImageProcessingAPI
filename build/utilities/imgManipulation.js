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
const sharp_1 = __importDefault(require("sharp"));
const fs_1 = require("fs");
const path_1 = __importDefault(require("path"));
const resize = (x, y, fileName, done) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const inputImgDir = path_1.default.join(__dirname, "../../public", fileName);
        const myImg = yield fs_1.promises.readFile(inputImgDir);
        (0, sharp_1.default)(myImg)
            .resize(x, y)
            .withMetadata()
            .toFile(path_1.default.join(__dirname, "../../public", "output.jpg"))
            .catch((err) => {
            console.log(err);
        });
        return done();
    }
    catch (err) {
        console.log(err);
    }
});
exports.default = { resize };
