
import imgManipulation from "../utilities/imgManipulation";
import NodeCache  from"node-cache";
import fs from'fs';
//import request from "request"
import path from "path"
let mycache =new NodeCache()


type storingObj ={
//    url: string,
    x: number,
    y: number
}

// let downloadImage = async(url: string, cb: Function)=>{
// //downloading image and saving as 'input.jpg'
//     await request.head(url, async function(err, res, body){
//         await request(url).pipe(fs.createWriteStream('./public/input.jpg')).on('close', ()=>{
//             console.log('download done');
//             cb();
//         });
//       });
// }

let getResizeImage = async (req: any, res: any, next: any) =>{
    let reqX: number = await parseInt(req.query.x);
    let reqY: number = await parseInt(req.query.y);
    console.log("request recieved");
    //let imgUrl: string = req.query.url;
    let stored = await mycache.get <storingObj>("myKey");
     if(stored){
        if(stored.x=== reqX&&stored.y===reqY){

            //res.status(200).sendFile('C:/Users/moatasem/Documents/Projects/NodeJS/ImageProcessingAPI/public/output.jpg');
            await res.status(200).sendFile('C:/Users/moatasem/Documents/Projects/NodeJS/ImageProcessingAPI/public/output.jpg');
            res.end
            console.log("already resized");
        }
    }else{
            console.log("cache not found");
         
            await imgManipulation.resize(reqX,reqY);
            console.log('resize endpoint called');
            let Obj: storingObj={x: reqX, y: reqY}
            let success=  mycache.set("myKey", Obj, 100000);
            console.log(`resize cached: ${success}`);
            await res.status(200).sendFile('C:/Users/moatasem/Documents/Projects/NodeJS/ImageProcessingAPI/public/output.jpg');
            res.end();
            
            // try{        
            //     await downloadImage(imgUrl, resizeFunction);
            // }catch(err){
            //     console.log(err);
            // }
    } 
 }
let getDeleteImage =async (req: any, res: any, next: any) => {
    //this request deletes the cached data+ the output.jpg file
        
        try{
        mycache.del("myKey");
        await fs.unlinkSync('C:/Users/moatasem/Documents/Projects/NodeJS/ImageProcessingAPI/public/output.jpg');
        console.log("image deleted");
        res.status(200).end("image deleted");
        }catch(err){
            console.log(err); 
            res.status(500).end
        }
        
    }



export default{
    getResizeImage,
    getDeleteImage
}