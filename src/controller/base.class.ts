import { NextFunction, Request, Response } from "express";
import { catchError, Utils } from "../utils/utils";
import { psql } from "../database/db";

export abstract class BaseCtrl {

    async create(req: Request, res: Response, next: NextFunction){
        try {

            Utils.serverResponse({
                response: res,
                code: 200,
                msg: 'Created',
                value: 1,
                data: {}
            });
        } catch (error:any) {
            catchError(res, error);
        }
    }

    async update(req: Request, res: Response, next: NextFunction){
        try {

            // const response = await DTO.update({
            //     ...req.body
            // }, {
            //     where: {
            //         id: req.params.id
            //     }
            // });

            Utils.serverResponse({
                response: res,
                code: 200,
                msg: 'Updated',
                value: 1,
                data: {}
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

            // const response = await DTO.findOne({
            //     where: {
            //         id: req.params.id
            //     }
            // });

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
            Utils.serverResponse({
                response: res,
                code: 200,
                msg: 'Pago creado',
                value: 1,
                data: []
            });
        } catch (error:any) {
            catchError(res, error);
        }
    }
}