import express from "express";
import cors from "cors";
import updateRouter from "api/update/updateRouter";

const app = express();

app.use(cors());
app.use(express.json());
app.use("/update", updateRouter);

export default app;
