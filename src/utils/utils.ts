import { createHmac } from "crypto";
import { IMessageServe } from "../interfaces/global.model";
import { Response } from "express";


export class Utils {

    static encryptPassword( password:string) {
        return  createHmac('sha1', password).digest('hex');
    }

    static serverResponse(param:IMessageServe) {
        const { code,response,value,data,msg, error, validations} =  param;
        response.status(code).json({
            msg,
            value,
            data,
            error,
            validations
        });
    }
}


export function catchError(res: Response, error:any) {
    console.log("🚀 ~ catchError ~ error:", error);

    let msgErr = 'Ocurrió un error y no se pudo completar la operación, intentelo más tarde.';

    if (error.original.detail) {
        msgErr = error.original.detail;
    }

    console.log("🚀 ~ createUser ~ error:", error.original.detail)
    Utils.serverResponse({
        response: res,
        code: 403,
        msg: msgErr,
        value: 3,
        error: true
    });
}
