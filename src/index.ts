import express from "express"
const app = express();

app.get('/',(req,res,next)=>{
    res.send("hello");
})

app.listen(3000);

export default app