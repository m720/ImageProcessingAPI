import express from "express";
import imgRoutes from "./routes/imgRoutes";
const app = express();

// using middleware to redirect img requests to be handled with img routes
app.use("/img", imgRoutes);

app.get(
  "/",
  (
    req: express.Request,
    res: express.Response,
    next: express.NextFunction
  ): void => {
    res.status(200).json({ name: "hello" });
    // console.log("request sent to '/' ");
    res.end();
  }
);

app.use(function (
  err: Error,
  req: express.Request,
  res: express.Response,
  next: express.NextFunction
) {
  console.error(err.stack);
  res.status(500).send("Something broke!");
});

app.listen(3001);
console.log("app is running on http://localhost:3001");

export default app;
