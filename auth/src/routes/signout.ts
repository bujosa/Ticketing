import express from "express";
import { Response } from "express";

const router = express.Router();

router.post("/api/users/signout", (res: Response) => {
  res.send("Hi there");
});

export { router as signoutRouter };
