import { Litd } from "../litd_grpc/types.js";

export interface AccountInfoRequest {
    id?: string;
    label?: string;
    litd: Litd;
}