import imgController from "../controllers/imgController"
import express from "express";
const router = express.Router();

router.get('/resize', imgController.getResizeImage)








export default router;