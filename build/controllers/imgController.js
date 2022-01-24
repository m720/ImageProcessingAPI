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
let mycache = new node_cache_1.default();
// let downloadImage = async(url: string, cb: Function)=>{
// //downloading image and saving as 'input.jpg'
//     await request.head(url, async function(err, res, body){
//         await request(url).pipe(fs.createWriteStream('./public/input.jpg')).on('close', ()=>{
//             console.log('download done');
//             cb();
//         });
//       });
// }
let getResizeImage = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    let reqX = yield parseInt(req.query.x);
    let reqY = yield parseInt(req.query.y);
    console.log("request recieved");
    //let imgUrl: string = req.query.url;
    let stored = yield mycache.get("myKey");
    if (stored) {
        if (stored.x === reqX && stored.y === reqY) {
            //res.status(200).sendFile('C:/Users/moatasem/Documents/Projects/NodeJS/ImageProcessingAPI/public/output.jpg');
            yield res.status(200).sendFile('C:/Users/moatasem/Documents/Projects/NodeJS/ImageProcessingAPI/public/output.jpg');
            res.end;
            console.log("already resized");
        }
    }
    else {
        console.log("cache not found");
        yield imgManipulation_1.default.resize(reqX, reqY);
        console.log('resize endpoint called');
        let Obj = { x: reqX, y: reqY };
        let success = mycache.set("myKey", Obj, 100000);
        console.log(`resize cached: ${success}`);
        yield res.status(200).sendFile('C:/Users/moatasem/Documents/Projects/NodeJS/ImageProcessingAPI/public/output.jpg');
        res.end();
        // try{        
        //     await downloadImage(imgUrl, resizeFunction);
        // }catch(err){
        //     console.log(err);
        // }
    }
});
let getDeleteImage = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    //this request deletes the cached data+ the output.jpg file
    try {
        mycache.del("myKey");
        yield fs_1.default.unlinkSync('C:/Users/moatasem/Documents/Projects/NodeJS/ImageProcessingAPI/public/output.jpg');
        console.log("image deleted");
        res.status(200).end("image deleted");
    }
    catch (err) {
        console.log(err);
        res.status(500).end;
    }
});
exports.default = {
    getResizeImage,
    getDeleteImage
};
