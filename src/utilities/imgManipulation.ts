const sharp = require("sharp")
import {promises as fs} from "fs"
var inputImgDir = './public/Free-HD-Very-Cool-Download-Photos.jpg'
var myImg: any;

let ReadImg =  async(ImgDir: string )=>{
        myImg=  await fs.readFile(ImgDir);
}

let resize=  async (x :number , y: number )=>{
    if(!myImg){
        try {await ReadImg(inputImgDir)
        sharp(myImg)
        .resize(x,y)
        .withMetadata()
        .toFile('./public/output.jpeg')
        .catch( (err: any) =>{
            console.log(err);
        })}catch(err){
            console.log(err);
        }

    }else{
        sharp(myImg)
        .resize(x,y)
        .toFile('./public/output.jpeg')
        .catch( (err: any) =>{
            console.log(err);
        })}
   
}

export default{resize }