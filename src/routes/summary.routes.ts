import express, { Router } from "express";
import { getSummary } from "../controllers/report.controller";

const summmaryRouter = express.Router()

summmaryRouter.get('/', getSummary)

export default summmaryRouter;