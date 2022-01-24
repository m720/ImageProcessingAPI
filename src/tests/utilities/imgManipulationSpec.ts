import imgManipulation from "../../utilities/imgManipulation";
import sharp from "sharp";
import fs from 'fs'
import supertest from 'supertest';
import app from '../../index';

let outputImgDir ='./public/output.jpeg'
const request =supertest(app)

describe("functions test", ()=>{
    it("resize function", async ()=>{
        await imgManipulation.resize(200,300);
        expect(fs.existsSync(outputImgDir)).toBeTruthy()
    })
})

describe("endpoint test", ()=>{
    it("resize endpoint", async ()=>{
        const res = await request.get('/img/resize?x=400&y=300&url=https://ichef.bbci.co.uk/news/976/cpsprodpb/12FEC/production/_122540877_072851458.jpg');
       expect(res.status).toBe(200);
    })

})