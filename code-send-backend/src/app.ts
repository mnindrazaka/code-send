import express from "express";
import cors from "cors";
import errorHandler from "middleware/errorHandler";
import userRouter from "api/user/user.router";
import projectRouter from "api/project/project.router";
import updateRouter from "api/update/update.router";
import geocodingRouter from "api/geocoding/geocoding.router";
import verifyToken from "middleware/verifyToken";

const app = express();

app.use(cors());
app.use(express.json());
app.use(userRouter);
app.use(verifyToken, projectRouter);
app.use(verifyToken, updateRouter);
app.use(geocodingRouter);
app.use(errorHandler);

export default app;
