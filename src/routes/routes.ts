import express  from "express";
import { userCtrl } from "../controller/user.controller";
import { ApiRoute } from "./api_routes";
import { paymentCtrl } from "../controller/payment.controller";
import { clientCtrl } from "../controller/client.controller";

const router = express.Router();

export function routes () {
    router.post(ApiRoute.auth, userCtrl.authUser);
    router.patch(ApiRoute.update_user, userCtrl.update);
    router.post(ApiRoute.create_user, userCtrl.create);

    // PAYMENTS ******************************************
    router.post(ApiRoute.create_payment, paymentCtrl.create);
    router.patch(ApiRoute.update_payment, paymentCtrl.update);
    router.get(ApiRoute.get_payment, paymentCtrl.get);
    router.get(ApiRoute.get_payments, paymentCtrl.getAll);
    router.delete(ApiRoute.delete_payment, paymentCtrl.delete);

    // CLIENTS ******************************************
    router.post(ApiRoute.create_client, clientCtrl.create);
    router.patch(ApiRoute.update_client, clientCtrl.update);
    router.get(ApiRoute.get_client, clientCtrl.get);
    router.get(ApiRoute.get_clients, clientCtrl.getAll);
    router.delete(ApiRoute.delete_client, clientCtrl.delete);

    return router;
}