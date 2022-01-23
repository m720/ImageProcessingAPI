"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const imgController_1 = __importDefault(require("../controllers/imgController"));
const express_1 = __importDefault(require("express"));
const router = express_1.default.Router();
router.get('/resize', imgController_1.default.getResizeImage);
exports.default = router;
