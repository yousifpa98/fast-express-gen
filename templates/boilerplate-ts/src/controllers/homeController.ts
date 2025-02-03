// src/controllers/homeController.ts
import { Request, Response } from "express";

export const getHome = (req: Request, res: Response) => {
  res.json({ 
    message: "Welcome to your Express Boilerplate!",
    author: "Your Name",
    version: "1.0.0"
  });
};
