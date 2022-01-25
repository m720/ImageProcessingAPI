import sharp from "sharp";
import { promises as fs } from "fs";
import path from "path";

const resize = async (
  x: number,
  y: number,
  fileName: string,
  done: Function
): Promise<void> => {
  try {
    const inputImgDir = path.join(__dirname, "../../public", fileName);
    const myImg = await fs.readFile(inputImgDir);
    sharp(myImg)
      .resize(x, y)
      .withMetadata()
      .toFile(path.join(__dirname, "../../public", "output.jpg"))
      .catch((err: any) => {
        console.log(err);
      });

    return done();
  } catch (err) {
    console.log(err);
  }
};

export default { resize };
