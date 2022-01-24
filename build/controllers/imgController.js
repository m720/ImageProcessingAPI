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
const imgManipulation_1 = __importDefault(require("../utilities/imgManipulation"));
const node_cache_1 = __importDefault(require("node-cache"));
const fs_1 = __importDefault(require("fs"));
const request_1 = __importDefault(require("request"));
const path_1 = __importDefault(require("path"));
let mycache = new node_cache_1.default();
let downloadImage = (url, cb) => __awaiter(void 0, void 0, void 0, function* () {
    //downloading image and saving as 'input.jpg'
    yield request_1.default.head(url, function (err, res, body) {
        return __awaiter(this, void 0, void 0, function* () {
            yield (0, request_1.default)(url).pipe(fs_1.default.createWriteStream('./public/input.jpg')).on('close', () => {
                console.log('download done');
                cb();
            });
        });
    });
});
let getResizeImage = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    let reqX = yield parseInt(req.query.x);
    let reqY = yield parseInt(req.query.y);
    let imgUrl = req.query.url;
    let stored = mycache.get("myKey");
    if (stored) {
        console.log(stored);
        console.log(typeof stored);
        if (stored.url === imgUrl && stored.x === reqX && stored.y === reqY) {
            //res.status(200).sendFile('C:/Users/moatasem/Documents/Projects/NodeJS/ImageProcessingAPI/public/output.jpg');
            yield res.status(200).sendFile(path_1.default.join(__dirname, '../../public/output.jpg'));
            res.end;
            console.log("already downloaded");
        }
    }
    else {
        let resizeFunction = function () {
            return __awaiter(this, void 0, void 0, function* () {
                yield imgManipulation_1.default.resize(reqX, reqY);
                console.log('resize endpoint called');
                let Obj = { url: imgUrl, x: reqX, y: reqY };
                let success = mycache.set("myKey", Obj, 100000);
                console.log(`success is ${success}`);
                console.log(mycache.get("myKey"));
                let obj = mycache.get("myKey");
                yield res.status(200).sendFile('C:/Users/moatasem/Documents/Projects/NodeJS/ImageProcessingAPI/public/output.jpg');
                res.end();
            });
        };
        try {
            yield downloadImage(imgUrl, resizeFunction);
        }
        catch (err) {
            console.log(err);
        }
    }
});
exports.default = {
    getResizeImage
};
