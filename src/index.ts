import express from "express";
import imgRoutes from './routes/imgRoutes'
import bodyParser from "body-parser";
const app = express();

//using middleware to redirect img requests to be handled with img routes
app.use('/img',imgRoutes);
//parser
app.use(bodyParser.urlencoded({extended: false}))

app.get('/',(req,res,next)=>{
    res.status(200).json({name: 'hello'});
    console.log("request sent to '/' ");
    res.end();
})

app.listen(3000);
console.log("app is running on http://localhost:3000");

export default app