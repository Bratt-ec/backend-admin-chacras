import { Request, Response, NextFunction } from "express";
import { ParamsDictionary } from "express-serve-static-core";
import { ParsedQs } from "qs";
import { BaseCtrl } from "./base.class";
import { catchError, Utils } from "../utils/utils";
import { PaymentDTO } from "../dto/payments.dto";
import { clientDTO } from "../dto/client.dto";
import { Op } from "sequelize";
import { debtCtrl } from "./debt.controller";
import { DebtDTO } from "../dto/debts.dto";

class PaymentCtrl implements BaseCtrl {

    async getAll(req: Request, res: Response, next: NextFunction): Promise<void> {
        try {

            const response = await PaymentDTO.findAll({
                where: {
                    "status": 1
                },
                order:[
                    ['createdAt', 'DESC']
                ],
                include: clientDTO
            });

            console.log("🚀 ~ getAll ~ response:", response)

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
                "tb_client_id", "date_emission", "date_expiry", "current_consumption",
                "last_consumption", "month", "code", "num_payment_info", "pay_consumption",
                "debt_pending", "new_connection", "reconnection", "interest_due","total_pay"
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

            if (req.body['id_debts'] ) {
                for (const iDebt of req.body['id_debts']) {
                    await DebtDTO.update({
                        debt_status:'paid'
                    }, {
                        where: {
                            id: iDebt
                        }
                    });
                }

                req.body['debt_pending'] = 0;
            }

            const response = await PaymentDTO.create({
                ...req.body
            });

            const detailCreated = await PaymentDTO.findOne({
                where: {
                    id: response.dataValues.id
                },
                include: clientDTO
            });

            Utils.serverResponse({
                response: res,
                code: 200,
                msg: 'Pago creado',
                value: 1,
                data: {...detailCreated?.dataValues}
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
                "debt_pending", "new_connection", "reconnection", "interest_due","total_pay"
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
                },
                include: clientDTO
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

    async getNumberPaymentDoc(req: Request, res: Response, next: NextFunction){
        try {

            const response = await PaymentDTO.findOne({
                order: [['createdAt', 'DESC']]
            });

            let docNumber = 1001;

            if (response) {
                docNumber = response.dataValues.num_payment_info + 1;
            }

            Utils.serverResponse({
                response: res,
                code: 200,
                msg: 'Numero de doc de Pago',
                value: 1,
                data: docNumber
            });
        } catch (error:any) {
            catchError(res, error);
        }
    }
}

export const paymentCtrl = new PaymentCtrl();