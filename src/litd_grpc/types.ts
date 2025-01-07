import { GrpcObject, ServiceClientConstructor } from '@grpc/grpc-js';
import { ProtobufTypeDefinition } from '@grpc/proto-loader';

export interface ApiForProtoParams {
    credentials: any;
    params: any;
    path: string;
    service: string;
    socket: string;
    type: string;
};

export type GrpcObjectExt = GrpcObject & { [index: string]: any };

export type ApiObject =
    | GrpcObject
    | ServiceClientConstructor
    | ProtobufTypeDefinition;

export interface Litd {
    default: any;
    firewall: any;
    lit_accounts: any;
    lit_autopilot: any;
    lit_sessions: any;
    lit_status: any;
    proxy: any;
}

export type IsTapdResponse = {
    litd: Litd;
    method: string;
    type:
    | 'firewall'
    | 'default'
    | 'lit_accounts'
    | 'lit_autopilot'
    | 'lit_sessions'
    | 'lit_status'
    | 'proxy';
}