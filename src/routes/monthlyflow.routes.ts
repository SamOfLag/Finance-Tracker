import { Router } from "express";
import { getMonthlyFlow } from "../controllers/chartdata.controller";

const chartRouter = Router()

chartRouter.get('/', getMonthlyFlow)

export default chartRouter;