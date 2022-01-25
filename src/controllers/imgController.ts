import imgManipulation from "../utilities/imgManipulation";
import NodeCache from "node-cache";
import fs from "fs";
import express from "express";
import path from "path";

const mycache = new NodeCache();

type storingObj = {
  fileName: string;
  x: number;
  y: number;
};

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
    } else if (
      parseInt(req.query.x as string) <= 0 ||
      parseInt(req.query.y as string) <= 0
    ) {
      res.status(404);
      res.end("please enter a positive integer number for hight and width");
    } else {
      const reqX: number = await parseInt(req.query.x as string);
      const reqY: number = await parseInt(req.query.y as string);
      const reqName: string = req.query.name as string;
      const fullName: string = path.join(__dirname, "../../public", reqName);
      // checks if the file exists
      //  console.log("does the file exist",await fs.existsSync(fullName));
      if (!fs.existsSync(fullName)) {
        res.status(404).end("file not found");
      } else {
        const stored = mycache.get<storingObj>("myKey");
        if (stored) {
          if (
            stored.x === reqX &&
            stored.y === reqY &&
            stored.fileName === reqName
          ) {
            res
              .status(200)
              .sendFile(path.join(__dirname, "../../public", "output.jpg"));
          } else {
            imgManipulation
              .resize(reqX, reqY, reqName, () => {
                const Obj: storingObj = { x: reqX, y: reqY, fileName: reqName };
                mycache.set("myKey", Obj, 100000);
                try {
                  setTimeout(() => {
                    res
                      .status(200)
                      .sendFile(
                        path.join(__dirname, "../../public", "output.jpg")
                      );
                  }, 2000);
                } catch (err) {
                  res.status(500).end("server error");
                }
              })
              .catch((err) => {
                res.status(500).end("server Error", err);
              });
          }
        } else {
          imgManipulation.resize(reqX, reqY, reqName, () => {
            const Obj: storingObj = { x: reqX, y: reqY, fileName: reqName };
            mycache.set("myKey", Obj, 100000);
            setTimeout(() => {
              res
                .status(200)
                .sendFile(path.join(__dirname, "../../public", "output.jpg"));
            }, 2000);
          });
        }
      }
    }
  } catch (error) {
    res.status(500).end("server Error");
  }
};

const getDeleteImage = async (
  req: express.Request,
  res: express.Response,
  next: express.NextFunction
): Promise<void> => {
  // this request deletes the cached data+ the output.jpg file

  try {
    await mycache.del("myKey");
    await setTimeout(() => {
      if (fs.existsSync(path.join(__dirname, "../../public", "output.jpg"))) {
        console.log(
          fs.existsSync(path.join(__dirname, "../../public", "output.jpg"))
        );
        fs.unlinkSync(path.join(__dirname, "../../public", "output.jpg"));
        // console.log("image deleted");
        res.status(200).end("image deleted");
      } else {
        res.status(200).end("image already deleted");
      }
    }, 2000);
  } catch (err) {
    console.log(err);
    res.status(404).end("file not found");
  }
};

export default {
  getResizeImage,
  getDeleteImage,
};
