import express from "express";
import cors from "cors";
import errorHandler from "middleware/errorHandler";
import updateRouter from "api/update/update.router";

const app = express();

app.use(cors());
app.use(express.json());
app.use("/update", updateRouter);
app.use(errorHandler);

export default app;
