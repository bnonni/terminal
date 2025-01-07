import { EventEmitter } from 'events';
import { ClientReadableStream } from '@grpc/grpc-js';

export interface EmitSubscriptionErrorParams {
    emitter: EventEmitter;
    subscription: ClientReadableStream<any>
};

export interface ServiceTypes {
    firewall: string;
    default: string;
    lit_accounts: string;
    lit_autopilot: string;
    lit_sessions: string;
    lit_status: string;
    proxy: string
    [index: string]: any;
};

export interface ProtoFiles {
    Firewall: string;
    Lit_Accounts: string;
    Lit_Autopilot: string;
    Lit_Sessions: string;
    Lit_Status: string;
    Proxy: string;
    [index: string]: any;
};

export interface UnAuthParams {
    cert: string;
    path?: string;
    socket?: string;
};

export type AuthParams = UnAuthParams & { macaroon: string; };

export type PackageTypes = ProtoFiles;

export type HandleRemoveListenerParams = EmitSubscriptionErrorParams & {
    events: string[];
};