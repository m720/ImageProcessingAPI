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
const path_1 = __importDefault(require("path"));
const mycache = new node_cache_1.default();
const getResizeImage = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        if (req.query.x == null || req.query.y == null || req.query.name == null) {
            res
                .status(404)
                .end("please enter width as x & height as y & file name as name");
        }
        else if (Number.isNaN(parseInt(req.query.x)) ||
            Number.isNaN(parseInt(req.query.y))) {
            res.status(404);
            res.end("please enter numbers as height and width");
        }
        else if (parseInt(req.query.x) <= 0 || parseInt(req.query.y) <= 0) {
            res.status(404);
            res.end("please enter a positive integer number for hight and width");
        }
        else {
            const reqX = yield parseInt(req.query.x);
            const reqY = yield parseInt(req.query.y);
            const reqName = req.query.name;
            const fullName = path_1.default.join(__dirname, "../../public", reqName);
            // checks if the file exists
            //  console.log("does the file exist",await fs.existsSync(fullName));
            if (!fs_1.default.existsSync(fullName)) {
                res.status(404).end("file not found");
            }
            else {
                const stored = mycache.get("myKey");
                if (stored) {
                    if (stored.x === reqX &&
                        stored.y === reqY &&
                        stored.fileName === reqName) {
                        res
                            .status(200)
                            .sendFile(path_1.default.join(__dirname, "../../public", "output.jpg"));
                    }
                    else {
                        imgManipulation_1.default
                            .resize(reqX, reqY, reqName, () => {
                            const Obj = { x: reqX, y: reqY, fileName: reqName };
                            mycache.set("myKey", Obj, 100000);
                            try {
                                setTimeout(() => {
                                    res
                                        .status(200)
                                        .sendFile(path_1.default.join(__dirname, "../../public", "output.jpg"));
                                }, 2000);
                            }
                            catch (err) {
                                res.status(500).end("server error");
                            }
                        })
                            .catch((err) => {
                            res.status(500).end("server Error", err);
                        });
                    }
                }
                else {
                    imgManipulation_1.default.resize(reqX, reqY, reqName, () => {
                        const Obj = { x: reqX, y: reqY, fileName: reqName };
                        mycache.set("myKey", Obj, 100000);
                        setTimeout(() => {
                            res
                                .status(200)
                                .sendFile(path_1.default.join(__dirname, "../../public", "output.jpg"));
                        }, 2000);
                    });
                }
            }
        }
    }
    catch (error) {
        res.status(500).end("server Error");
    }
});
const getDeleteImage = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    // this request deletes the cached data+ the output.jpg file
    try {
        yield mycache.del("myKey");
        yield setTimeout(() => {
            if (fs_1.default.existsSync(path_1.default.join(__dirname, "../../public", "output.jpg"))) {
                console.log(fs_1.default.existsSync(path_1.default.join(__dirname, "../../public", "output.jpg")));
                fs_1.default.unlinkSync(path_1.default.join(__dirname, "../../public", "output.jpg"));
                // console.log("image deleted");
                res.status(200).end("image deleted");
            }
            else {
                res.status(200).end("image already deleted");
            }
        }, 2000);
    }
    catch (err) {
        console.log(err);
        res.status(404).end("file not found");
    }
});
exports.default = {
    getResizeImage,
    getDeleteImage,
};
