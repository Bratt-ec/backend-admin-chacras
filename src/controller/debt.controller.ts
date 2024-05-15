import { Request, Response, NextFunction } from "express";
import { BaseCtrl } from "./base.class";
import { catchError, Utils } from "../utils/utils";
import { DebtDTO } from "../dto/debts.dto";
import { clientDTO } from "../dto/client.dto";
import { UserDTO } from "../dto/user.dto";

class DebtCtrl implements BaseCtrl {

    async create(req: Request, res: Response, next: NextFunction){
        try {

            const fields: string[] = [
                "tb_client_id", "interest_due", "month", "year","total_debt"
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

            await clientDTO.update({
                status_payment: 'DEBT'
            }, {
                where: {
                    id: req.body.tb_client_id
                }
            });

            const response = await DebtDTO.create({
                ...req.body
            });

            Utils.serverResponse({
                response: res,
                code: 200,
                msg: 'Created',
                value: 1,
                data: response.dataValues
            });

        } catch (error:any) {
            catchError(res, error);
        }
    }

    async update(req: Request, res: Response, next: NextFunction){
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

            const response = await DebtDTO.update({
                ...req.body
            }, {
                where: {
                    id: req.params.id
                }
            });

            Utils.serverResponse({
                response: res,
                code: 200,
                msg: 'Updated',
                value: 1,
                data: req.body
            });
        } catch (error:any) {
            catchError(res, error);
        }
    }

    async delete(req: Request, res: Response, next: NextFunction){
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

            // await DTO.update({
            //     status: 0
            // }, {
            //     where: {
            //         id: req.params.id
            //     }
            // });

            Utils.serverResponse({
                response: res,
                code: 200,
                msg: 'Deleted',
                value: 1,
                data: {}
            });

        } catch (error:any) {
            catchError(res, error);
        }
    }

    async get(req: Request, res: Response, next: NextFunction){
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

            const response = await DebtDTO.findOne({
                where: {
                    id: req.params.id
                }
            });

            Utils.serverResponse({
                response: res,
                code: 200,
                msg: 'Pago creado',
                value: 1,
                data: {}
            });
        } catch (error:any) {
            catchError(res, error);
        }
    }

    async getAll(req: Request, res: Response, next: NextFunction){
        try {

            const response = await DebtDTO.findAll({
                where: {
                    "status": 1
                },
                order:[
                    ['createdAt', 'DESC']
                ],
                include: clientDTO
            });


            Utils.serverResponse({
                response: res,
                code: 200,
                msg: 'Listado de deudas',
                value: 1,
                data: response.map(item => item.dataValues)
            });
        } catch (error:any) {
            catchError(res, error);
        }
    }
}

export const debtCtrl = new DebtCtrl();