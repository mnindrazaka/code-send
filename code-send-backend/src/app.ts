import express from "express";
import cors from "cors";
import errorHandler from "middleware/errorHandler";
import projectRouter from "api/project/project.router";
import updateRouter from "api/update/update.router";

const app = express();

app.use(cors());
app.use(express.json());
app.use(projectRouter);
app.use(updateRouter);
app.use(errorHandler);

export default app;
