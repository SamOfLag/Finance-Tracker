import { Router } from "express";
import { getMonthlyFlow } from "../controllers/monthlyflow.controller";

const chartRouter = Router()

chartRouter.get('/', getMonthlyFlow)

export default chartRouter;