import { Request, Response, NextFunction } from "express";
import { ParamsDictionary } from "express-serve-static-core";
import { ParsedQs } from "qs";
import { BaseCtrl } from "./base.class";
import { catchError, Utils } from "../utils/utils";
import { clientDTO } from "../dto/client.dto";

class ClientCtrl implements BaseCtrl {

    async create(req: Request, res: Response, next: NextFunction){
        try {

            const fields: string[] = [
                "names", "lastNames", "cedula", "phone",
                "address", "number_meter", "consumption"
            ];

            const errors: string[] = [];

            for (const iterator of fields) {
                if (!req.body[iterator] || req.body[iterator] == '')  {
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

            const response = await clientDTO.create({
                ...req.body
            });
            console.log("🚀 ~ create ~ response:", response.dataValues)

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


            const fields: string[] = [
                "names", "lastNames", "cedula", "phone",
                "address", "number_meter", "consumption"
            ];

            const errors: string[] = [];

            for (const iterator of fields) {
                if (!req.body[iterator] || req.body[iterator] == '')  {
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

            const response = await clientDTO.update({
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
                data: { ...req.body }
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

            await clientDTO.update({
                status: 0
            }, {
                where: {
                    id: req.params.id
                }
            });

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

            const response = await clientDTO.findOne({
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
                msg: 'cliente creado',
                value: 1,
                data: {...response.dataValues}
            });
        } catch (error:any) {
            catchError(res, error);
        }
    }

    async getAll(req: Request, res: Response, next: NextFunction){
        try {

            const response = await clientDTO.findAll({
                where: {
                    "status": 1
                }
            });

            Utils.serverResponse({
                response: res,
                code: 200,
                msg: 'Listado de clientes',
                value: 1,
                data: response.map(item => item.dataValues)
            });
        } catch (error:any) {
            catchError(res, error);
        }
    }
}

export const clientCtrl = new ClientCtrl();