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
// import request from "request"
const mycache = new node_cache_1.default();
// const downloadImage = async(url: string, cb: Function)=>{
// //downloading image and saving as 'input.jpg'
//     await request.head(url, async function(err, res, body){
//         await request(url).pipe(fs.createWriteStream('./public/input.jpg')).on('close', ()=>{
//             console.log('download done');
//             cb();
//         });
//       });
// }
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
        else {
            const reqX = yield parseInt(req.query.x);
            const reqY = yield parseInt(req.query.y);
            const reqName = req.query.name;
            const fullName = "C:/Users/moatasem/Documents/Projects/NodeJS/ImageProcessingAPI/public/" +
                reqName;
            // checks if the file exists
            //  console.log("does the file exist",await fs.existsSync(fullName));
            if (yield !fs_1.default.existsSync(fullName)) {
                res.status(404).end("file not found");
            }
            else {
                const stored = yield mycache.get("myKey");
                if (stored) {
                    if (stored.x === reqX &&
                        stored.y === reqY &&
                        stored.fileName === reqName) {
                        yield res
                            .status(200)
                            .sendFile("C:/Users/moatasem/Documents/Projects/NodeJS/ImageProcessingAPI/public/output.jpg");
                        res.end("done");
                        // console.log("already resized");
                    }
                    else {
                        yield imgManipulation_1.default.resize(reqX, reqY, reqName);
                        // console.log('resize endpoint called');
                        const Obj = { x: reqX, y: reqY, fileName: reqName };
                        mycache.set("myKey", Obj, 100000);
                        yield res
                            .status(200)
                            .sendFile("C:/Users/moatasem/Documents/Projects/NodeJS/ImageProcessingAPI/public/output.jpg");
                        res.end("done");
                    }
                }
                else {
                    yield imgManipulation_1.default.resize(reqX, reqY, reqName);
                    // console.log('resize endpoint called');
                    const Obj = { x: reqX, y: reqY, fileName: reqName };
                    mycache.set("myKey", Obj, 100000);
                    yield res
                        .status(200)
                        .sendFile("C:/Users/moatasem/Documents/Projects/NodeJS/ImageProcessingAPI/public/output.jpg");
                    res.end("done");
                }
            }
        }
    }
    catch (error) {
        res.status(500).end("server Error");
    }
});
// try{
//     await downloadImage(imgUrl, resizeFunction);
// }catch(err){
//     console.log(err);
// }
const getDeleteImage = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    // this request deletes the cached data+ the output.jpg file
    try {
        yield mycache.del("myKey");
        yield setTimeout(() => {
            fs_1.default.unlinkSync("C:/Users/moatasem/Documents/Projects/NodeJS/ImageProcessingAPI/public/output.jpg");
        }, 2000);
        // console.log("image deleted");
        res.status(200).end("image deleted");
    }
    catch (err) {
        console.log(err);
        res.status(500).end("error");
    }
});
exports.default = {
    getResizeImage,
    getDeleteImage,
};
