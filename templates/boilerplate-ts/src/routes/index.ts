// src/routes/index.ts
import express from "express";
import { getHome } from "../controllers/homeController";

const router = express.Router();

// Define routes
router.get("/", getHome);

export default router;