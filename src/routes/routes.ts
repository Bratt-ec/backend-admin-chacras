import express  from "express";
import { UserCtrl } from "../controller/user.controller";
import { ApiRoute } from "./api_routes";

const router = express.Router();

export function routes () {
    router.post(ApiRoute.auth, UserCtrl.authUser);
    router.post(ApiRoute.update_user, UserCtrl.updateUser);
    router.post(ApiRoute.create_user, UserCtrl.createUser);

    return router;
}