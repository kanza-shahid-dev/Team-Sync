import "dotenv/config";
import express, { NextFunction, Request, Response } from "express";
import session from "cookie-session";
import cors from "cors";
import { config } from "./config/app.config";
import connectDatabase from "./config/database.config";
import { errorHandler } from "./middlewares/errorHandler.middleware";
import { asyncHandler } from "./middlewares/asyncHandler.middleware";

const app = express();
const BASE_PATH = config.BASE_PATH;

app.use(express.json());

app.use(express.urlencoded({ extended: true }));

app.use(
  session({
    name: "session",
    keys: [config.SESSION_SECRET],
    maxAge: 24 * 60 * 60 * 1000,
    secure: config.NODE_ENV === "production",
    httpOnly: true,
    sameSite: "lax",
  })
);

app.use(cors({ origin: config.FRONTEND_ORIGIN, credentials: true }));

app.get(
  `/`,
  asyncHandler((req: Request, res: Response, next: NextFunction) => {
    throw new Error("test");
  })
);

app.use(errorHandler);

app.listen(config.PORT, async () => {
  console.log("started on port", config.PORT);
  await connectDatabase();
});
