import { Router } from "express";
import { getHome } from "../controllers/homeController.js";

const router = Router();

// Define routes
router.get("/", getHome);

export default router;
