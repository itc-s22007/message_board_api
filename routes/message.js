import express from "express";
import {check, validationResult} from "express-validator";
import {PrismaClient} from "@prisma/client";
import router from "./index.js";

// router.use((req, res, next) => {
//     if (!req.user) {
//         const err = new Error("unauthenticated");
//         err.status = 401;
//         throw err;
//     }
//     next();
// });
export default router;
