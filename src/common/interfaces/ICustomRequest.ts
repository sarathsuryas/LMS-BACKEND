import { Request } from "express";

export interface ICustomRequset extends Request{
    decodedData:any
}