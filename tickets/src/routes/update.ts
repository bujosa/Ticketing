import {
  NotAuthorizedError,
  NotFoundError,
  requireAuth,
  validateRequest,
} from "@ticketing-bujosa/common";
import express, { Request, Response } from "express";
import { Ticket } from "../models/ticket";
import { body } from "express-validator";

const router = express.Router();

router.put(
  "/api/tickets/:id",
  requireAuth,
  [
    body("title").not().isEmpty().withMessage("Title is required"),
    body("price")
      .isFloat({ gt: 0 })
      .withMessage("Price must be provided and must be greater than 0"),
  ],
  validateRequest,
  async (req: Request, res: Response) => {
    const ticket = await Ticket.findById(req.params.id);
    if (!ticket) {
      throw new NotFoundError();
    }

    if (ticket.user !== req.currentUser!.id) {
      throw new NotAuthorizedError();
    }

    res.send(ticket);
  }
);

export { router as updateTicketRouter };
