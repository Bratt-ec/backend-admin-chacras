import { NextFunction, Request, Response } from "express";
import { UserDTO } from "../dto/user.dto";
import { catchError, Utils } from "../utils/utils";
import { UUIDV4 } from "sequelize";
import { DB_UUID } from "../database/db";
import { BaseCtrl } from "./base.class";

class UserCtrl implements BaseCtrl {

    getAll(req: Request, res: Response, next: NextFunction): Promise<void> {
        throw new Error("Method not implemented.");
    }

    async authUser(req: Request, res: Response, next: NextFunction) {

        try {
            const { email, password } = req.body;

            if (!email) return Utils.serverResponse({
                response: res,
                code: 403,
                msg: "El email es requerido",
                value: 2,
                error: true
            });

            if (!password) return Utils.serverResponse({
                response: res,
                code: 403,
                msg: "La contraseña es requerida",
                value: 2,
                error: true
            });

            console.log("🚀 ~ authUser ~ req.body:", req.body)
            let passEncript = Utils.encryptPassword(password);

            const resp = await UserDTO.findAll({
                where: {
                    email: email,
                    password: passEncript
                },
                attributes: {exclude: ['password']},
            });
            console.log("🚀 ~ authUser ~ resp:", resp)

            if (!resp.length) {
                return Utils.serverResponse({
                    response: res,
                    code: 404,
                    msg: "Usuario o contraseña incorrecta",
                    value: 2,
                    error: true
                });
            } else {

                return Utils.serverResponse({
                    response: res,
                    code: 200,
                    msg: "Usuario autenticado",
                    value: 1,
                    data: resp[0]
                });
            }

        } catch (error) {
            catchError(res, error);
        }
    }

    async update(req: Request, res: Response, next: NextFunction) {
        try {
            const { password } = req.body;


            const resp = await UserDTO.findOne({
                where: {
                    id: req.params.id
                }
            })

            if (!resp) return Utils.serverResponse({
                response: res,
                code: 403,
                msg: "El usuario que intenta actaulizar no existe",
                value: 2,
                error: true
            });

            const {names, lastNames, email, password:passDTO } = resp.dataValues;

            const objUpdate = {
                names,
                lastNames,
                email,
                password: passDTO
            }

            const body = req.body;

            if (body.names) {
                objUpdate.names = body.names
            }

            if (body.lastNames) {
                objUpdate.lastNames = body.lastNames
            }

            if (body.email) {
                objUpdate.email = body.email
            }

            if (password) {
                let passEncript = Utils.encryptPassword(password);
                objUpdate.password = passEncript
            }

            console.log("🚀 ~ update ~ objUpdate:", objUpdate)

            await UserDTO.update(objUpdate, {
                where: {
                    id: req.params.id
                }
            });

            const updated = await UserDTO.findOne({
                where: {
                    id: req.params.id
                },
                attributes: {exclude: ['password']},
            })


            Utils.serverResponse({
                response: res,
                code: 200,
                msg: 'Updated',
                value: 1,
                data: updated?.dataValues
            });

        } catch (error) {
            catchError(res, error);
        }
    }

    async create(req: Request, res: Response, next: NextFunction) {
        try {
            const { names, lastNames, cedula, email, password } = req.body;
            const fields: string[] = ["names", "lastNames", "cedula", "email", "password"];
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

            let passEncript = Utils.encryptPassword(password);
            const response = await UserDTO.create({
                password: passEncript,
                names, lastNames, cedula, email
            });

            Utils.serverResponse({
                response: res,
                code: 200,
                msg: 'Usuario creado',
                value: 1,
                data: {...response.dataValues, password:'xxxxxxxxxxxs'}
            });
        } catch (error:any) {
            catchError(res, error);
        }
    }

    async delete(req: Request, res: Response, next: NextFunction) {
        throw new Error("Method not implemented.");
    }

    async get(req: Request, res: Response, next: NextFunction) {
        throw new Error("Method not implemented.");
    }
}


export const userCtrl = new UserCtrl();