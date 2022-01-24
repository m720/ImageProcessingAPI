
import imgManipulation from "../utilities/imgManipulation";
import NodeCache  from"node-cache";
import fs from'fs';
import request from "request"
import path from "path"
let mycache =new NodeCache()


type storingObj ={
    url: string,
    x: number,
    y: number
}

let downloadImage = async(url: string, cb: Function)=>{
//downloading image and saving as 'input.jpg'
    await request.head(url, async function(err, res, body){
        await request(url).pipe(fs.createWriteStream('./public/input.jpg')).on('close', ()=>{
            console.log('download done');
            cb();
        });
      });
  
}

let getResizeImage = async (req: any, res: any, next: any) =>{
    let reqX: number = await parseInt(req.query.x);
    let reqY: number = await parseInt(req.query.y);
    let imgUrl: string = req.query.url;
    let stored = mycache.get <storingObj>("myKey");
     if(stored){
    
        console.log(stored);
        console.log(typeof stored);
        if(stored.url=== imgUrl&&stored.x=== reqX&&stored.y===reqY){

            //res.status(200).sendFile('C:/Users/moatasem/Documents/Projects/NodeJS/ImageProcessingAPI/public/output.jpg');
            await res.status(200).sendFile(path.join(__dirname,'../../public/output.jpg'))
            res.end
            console.log("already downloaded");
        }
    }else{
        let resizeFunction = async function() {
            await imgManipulation.resize(reqX,reqY);
            console.log('resize endpoint called');
            let Obj: storingObj={url: imgUrl, x: reqX, y: reqY}
        let success=  mycache.set("myKey", Obj, 100000);
        console.log(`success is ${success}`);
        
            console.log(mycache.get("myKey"));
            let obj = mycache.get("myKey");
            await res.status(200).sendFile('C:/Users/moatasem/Documents/Projects/NodeJS/ImageProcessingAPI/public/output.jpg');
            res.end();
            }
            try{        
                await downloadImage(imgUrl, resizeFunction);
            }catch(err){
                console.log(err);
            }
    }

       
       
       
    
}

export default{
    getResizeImage
}