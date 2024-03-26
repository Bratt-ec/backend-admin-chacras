import { Response } from "express";

export interface IMessageServe {
    response: Response;
    code: number;
    msg: string;
    value: number;
    data?: any;
    validations?: any[];
    error?: boolean;
}