
import imgManipulation from "../utilities/imgManipulation";

let getResizeImage = async (req: any, res: any, next: any) =>{
    let reqX: number = await parseInt(req.query.x);
    let reqY: number = await parseInt(req.query.y);
        try{
            await imgManipulation.resize(reqX,reqY);
            console.log('resize endpoint called');
            res.status(200).end();
        }catch(err){
            console.log(err)
        }

  
    
}

export default{
    getResizeImage
}