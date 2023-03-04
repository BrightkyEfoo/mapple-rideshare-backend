import { Router } from "express";
import { adminLogin } from "./helpers.js";

export const AdminRouter = Router()

AdminRouter.route('/login').post(adminLogin)