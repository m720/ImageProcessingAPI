import sharp from "sharp";
import { promises as fs } from "fs";

const resize = async (x: number, y: number, fileName: string) => {
  try {
    const inputImgDir = "./public/" + fileName;
    const myImg = await fs.readFile(inputImgDir);
    sharp(myImg)
      .resize(x, y)
      .withMetadata()
      .toFile("./public/output.jpg")
      .catch((err: any) => {
        console.log(err);
      });
  } catch (err) {
    console.log(err);
  }
};

export default { resize };
