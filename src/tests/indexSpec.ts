import request from 'supertest';
import app from '../index';



describe("server tests:",()=>{
    it("server exists",()=>{
       return request(app).get('/').expect(200)
    })
})