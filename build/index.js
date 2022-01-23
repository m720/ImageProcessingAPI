"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const imgRoutes_1 = __importDefault(require("./routes/imgRoutes"));
const body_parser_1 = __importDefault(require("body-parser"));
const app = (0, express_1.default)();
//using middleware to redirect img requests to be handled with img routes
app.use('/img', imgRoutes_1.default);
//parser
app.use(body_parser_1.default.urlencoded({ extended: false }));
app.get('/', (req, res, next) => {
    res.status(200).json({ name: 'hello' });
    console.log("request sent to '/' ");
    res.end();
});
app.listen(3002);
console.log("app is running on http://localhost:3002");
exports.default = app;
