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
const sharp = require("sharp");
const fs_1 = require("fs");
var inputImgDir = './public/Free-HD-Very-Cool-Download-Photos.jpg';
var myImg;
let ReadImg = (ImgDir) => __awaiter(void 0, void 0, void 0, function* () {
    myImg = yield fs_1.promises.readFile(ImgDir);
});
let resize = (x, y) => __awaiter(void 0, void 0, void 0, function* () {
    if (!myImg) {
        try {
            yield ReadImg(inputImgDir);
            sharp(myImg)
                .resize(x, y)
                .withMetadata()
                .toFile('./public/output.jpeg')
                .catch((err) => {
                console.log(err);
            });
        }
        catch (err) {
            console.log(err);
        }
    }
    else {
        sharp(myImg)
            .resize(x, y)
            .toFile('./public/output.jpeg')
            .catch((err) => {
            console.log(err);
        });
    }
});
exports.default = { resize };
