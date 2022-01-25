import imgController from "../controllers/imgController";
import express from "express";
const router = express.Router();

router.get("/resize", imgController.getResizeImage);
router.get("/delete", imgController.getDeleteImage);

export default router;
