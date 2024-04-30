import { Request, Response, NextFunction } from "express";
import { ParamsDictionary } from "express-serve-static-core";
import { ParsedQs } from "qs";
import { BaseCtrl } from "./base.class";
import { catchError, Utils } from "../utils/utils";
import { PaymentDTO } from "../dto/payments.dto";

class PaymentCtrl implements BaseCtrl {

    async getAll(req: Request, res: Response, next: NextFunction): Promise<void> {
        try {

            const response = await PaymentDTO.findAll({
                where: {
                    "status": 1
                }
            });

            Utils.serverResponse({
                response: res,
                code: 200,
                msg: 'Listado de pagos',
                value: 1,
                data: response.map(item => item.dataValues)
            });
        } catch (error:any) {
            catchError(res, error);
        }
    }

    async create(req: Request, res: Response, next: NextFunction) {
        try {

            const fields: string[] = [
                "client", "date_emission", "date_expiry", "current_consumption",
                "last_consumption", "month", "code", "num_payment_info", "pay_consumption",
                "debt_pending", "is_new_connection", "is_reconnection", "interest_due","total_pay"
            ];
            const errors: string[] = [];

            for (const iterator of fields) {
                if (!req.body[iterator] && typeof req.body[iterator] == 'boolean' && typeof req.body[iterator] == 'number')  {
                    errors.push(`El campo ${iterator} es requerido`)
                }
            }

            if (errors.length) {
                Utils.serverResponse({
                    response: res,
                    code: 403,
                    validations: errors,
                    msg: 'Error en los campos',
                    value: 2,
                    error: true
                });
                return;
            }

            const response = await PaymentDTO.create({
                ...req.body
            });

            Utils.serverResponse({
                response: res,
                code: 200,
                msg: 'Pago creado',
                value: 1,
                data: {...response.dataValues}
            });
        } catch (error:any) {
            catchError(res, error);
        }
    }

    async update(req: Request, res: Response, next: NextFunction) {
        try {

            const fields: string[] = [
                "client", "date_emission", "date_expiry", "current_consumption",
                "last_consumption", "month", "code", "num_payment_info", "pay_consumption",
                "debt_pending", "is_new_connection", "is_reconnection", "interest_due","total_pay"
            ];
            const errors: string[] = [];

            for (const iterator of fields) {
                if (!req.body[iterator]) {
                    errors.push(`El campo ${iterator} es requerido`)
                }
            }

            if (errors.length) {
                Utils.serverResponse({
                    response: res,
                    code: 403,
                    validations: errors,
                    msg: 'Error en los campos',
                    value: 2,
                    error: true
                });
                return;
            }

            const response = await PaymentDTO.update({
                ...req.body
            }, {
                where: {
                    id: req.params.id
                }
            });

            Utils.serverResponse({
                response: res,
                code: 200,
                msg: 'Pago Actualizado',
                value: 1,
                data: {...req.body}
            });
        } catch (error:any) {
            catchError(res, error);
        }
    }

    async delete(req: Request, res: Response, next: NextFunction) {
        try {


            if (!req.params.id) {
                Utils.serverResponse({
                    response: res,
                    code: 403,
                    validations: [
                        'El parámetro :id es obrigatorio'
                    ],
                    msg: 'Error',
                    value: 2,
                    error: true
                });
                return;
            }

            await PaymentDTO.update({
                status: 0
            }, {
                where: {
                    id: req.params.id
                }
            });

            Utils.serverResponse({
                response: res,
                code: 200,
                msg: 'Pago eliminado',
                value: 1,
                data: {id: req.params.id }
            });
        } catch (error:any) {
            catchError(res, error);
        }
    }

    async get(req: Request, res: Response, next: NextFunction) {
        try {

            if (!req.params.id) {
                Utils.serverResponse({
                    response: res,
                    code: 403,
                    validations: [
                        'El parámetro :id es obrigatorio'
                    ],
                    msg: 'Error',
                    value: 2,
                    error: true
                });
                return;
            }

            const response = await PaymentDTO.findOne({
                where: {
                    id: req.params.id
                }
            });

            if (!response) {
                Utils.serverResponse({
                    response: res,
                    code: 403,
                    msg: `No existe un pago con el id: ${req.params.id}`,
                    value: 2,
                    error: true
                });
                return;
            }

            Utils.serverResponse({
                response: res,
                code: 200,
                msg: 'Detalle de un Pago',
                value: 1,
                data: {...response.dataValues}
            });
        } catch (error:any) {
            catchError(res, error);
        }
    }
}

export const paymentCtrl = new PaymentCtrl();