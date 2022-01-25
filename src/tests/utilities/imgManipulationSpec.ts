import imgManipulation from "../../utilities/imgManipulation";
import fs from "fs";
import supertest from "supertest";
import app from "../../index";

const outputImgDir = "./public/output.jpg";
const request = supertest(app);

describe("functions test", () => {
  it("resize function", async () => {
    await imgManipulation.resize(200, 300, "input.jpg",()=>{});
    await setTimeout(async () => {
      const res: boolean = await fs.existsSync(outputImgDir);

      expect(res).toBeTruthy();
    }, 2000);
  }, 15000);
});

describe("endpoint test", () => {
  
  it("resize endpoint", async () => {
    const res = await request.get("/img/resize?x=400&y=300&name=input2.jpg");

    expect(res.status).toBe(200);
  }, 15000);

  it("delete endpoint", async () => {
    const res = await request.get("/img/delete");

    expect(res.status).toBe(200);
    // expect(fs.existsSync(outputImgDir)).toBeFalsy();
  }, 10000);

  it("resource creation after deleting", async () => {
    setTimeout(async () => {
      const res = await request.get("/img/resize?x=400&y=300&name=input2.jpg");
      expect(res.status).toBe(200);
    }, 2000);
    
  }, 15000);
});
