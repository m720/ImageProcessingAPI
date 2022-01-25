import imgManipulation from "../utilities/imgManipulation";
import NodeCache from "node-cache";
import fs from "fs";
import express from "express";
// import request from "request"
const mycache = new NodeCache();

type storingObj = {
  fileName: string;
  x: number;
  y: number;
};

// const downloadImage = async(url: string, cb: Function)=>{
// //downloading image and saving as 'input.jpg'
//     await request.head(url, async function(err, res, body){
//         await request(url).pipe(fs.createWriteStream('./public/input.jpg')).on('close', ()=>{
//             console.log('download done');
//             cb();
//         });
//       });
// }

const getResizeImage = async (
  req: express.Request,
  res: express.Response,
  next: express.NextFunction
): Promise<void> => {
  try {
    if (req.query.x == null || req.query.y == null || req.query.name == null) {
      res
        .status(404)
        .end("please enter width as x & height as y & file name as name");
    } else if (
      Number.isNaN(parseInt(req.query.x as string)) ||
      Number.isNaN(parseInt(req.query.y as string))
    ) {
      res.status(404);
      res.end("please enter numbers as height and width");
    } else {
      const reqX: number = await parseInt(req.query.x as string);
      const reqY: number = await parseInt(req.query.y as string);
      const reqName: string = req.query.name as string;
      const fullName: string =
        "C:/Users/moatasem/Documents/Projects/NodeJS/ImageProcessingAPI/public/" +
        reqName;
      // checks if the file exists
      //  console.log("does the file exist",await fs.existsSync(fullName));
      if (await !fs.existsSync(fullName)) {
        res.status(404).end("file not found");
      } else {
        const stored = await mycache.get<storingObj>("myKey");
        if (stored) {
          if (
            stored.x === reqX &&
            stored.y === reqY &&
            stored.fileName === reqName
          ) {
            await res
              .status(200)
              .sendFile(
                "C:/Users/moatasem/Documents/Projects/NodeJS/ImageProcessingAPI/public/output.jpg"
              );
            res.end("done");
            // console.log("already resized");
          } else {
            await imgManipulation.resize(reqX, reqY, reqName);
            // console.log('resize endpoint called');
            const Obj: storingObj = { x: reqX, y: reqY, fileName: reqName };
            mycache.set("myKey", Obj, 100000);
            await res
              .status(200)
              .sendFile(
                "C:/Users/moatasem/Documents/Projects/NodeJS/ImageProcessingAPI/public/output.jpg"
              );
            res.end("done");
          }
        } else {
          await imgManipulation.resize(reqX, reqY, reqName);
          // console.log('resize endpoint called');
          const Obj: storingObj = { x: reqX, y: reqY, fileName: reqName };
          mycache.set("myKey", Obj, 100000);
          await res
            .status(200)
            .sendFile(
              "C:/Users/moatasem/Documents/Projects/NodeJS/ImageProcessingAPI/public/output.jpg"
            );
          res.end("done");
        }
      }
    }
  } catch (error) {
    res.status(500).end("server Error");
  }
};

// try{
//     await downloadImage(imgUrl, resizeFunction);
// }catch(err){
//     console.log(err);
// }

const getDeleteImage = async (
  req: express.Request,
  res: express.Response,
  next: express.NextFunction
): Promise<void> => {
  // this request deletes the cached data+ the output.jpg file

  try {
    await mycache.del("myKey");
    await setTimeout(() => {
      fs.unlinkSync(
        "C:/Users/moatasem/Documents/Projects/NodeJS/ImageProcessingAPI/public/output.jpg"
      );
    }, 2000);
    // console.log("image deleted");
    res.status(200).end("image deleted");
  } catch (err) {
    console.log(err);
    res.status(500).end("error");
  }
};

export default {
  getResizeImage,
  getDeleteImage,
};
