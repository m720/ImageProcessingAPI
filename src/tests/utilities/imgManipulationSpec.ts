import imgManipulation from "../../utilities/imgManipulation";
import sharp from "sharp";
import fs from 'fs'
import supertest from 'supertest';
import app from '../../index';

let outputImgDir ='./public/output.jpg'
const request =supertest(app)

describe("functions test", ()=>{
    it("resize function", async ()=>{
        await imgManipulation.resize(200,300);
        let res: boolean = await fs.existsSync(outputImgDir)
        expect(res).toBeTruthy()
    });
});

describe("endpoint test", ()=>{
    it("resize endpoint", async ()=>{
        const res = await request.get('/img/resize?x=400&y=300');
       expect(res.status).toBe(200);
    });
    it("delete endpoint", async()=>{
        const res = await request.get('/img/delete');
        //expect(res.status).toBe(200);
        expect(fs.existsSync(outputImgDir)).toBeFalsy();
    });
    it("resource creation after deleting", async ()=>{
        const res = await request.get('/img/resize?x=400&y=300');
       expect(res.status).toBe(200);
    });
});