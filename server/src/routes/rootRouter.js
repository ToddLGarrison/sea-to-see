import express from "express";
import userSessionsRouter from "./api/v1/userSessionsRouter.js";
import usersRouter from "./api/v1/usersRouter.js";
import clientRouter from "./clientRouter.js";
import itineraryRouter from "./api/v1/itinerariesRouter.js";
import weatherRouter from "./api/v1/weatherRouter.js";

const rootRouter = new express.Router();
rootRouter.use("/api/v1/user-sessions", userSessionsRouter);
rootRouter.use("/api/v1/users", usersRouter);
rootRouter.use("/api/v1/itineraries", itineraryRouter)
rootRouter.use("/api/v1/weather", weatherRouter)
rootRouter.use("/", clientRouter);

export default rootRouter;
