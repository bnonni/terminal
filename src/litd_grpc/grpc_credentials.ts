import grpc from '@grpc/grpc-js';

import decodeSerialized from './decode_serialized.js';
import grpcSsl from './grpc_ssl.js';
import { Logger } from 'scclogger';

const { combineChannelCredentials } = grpc.credentials;
const { createFromMetadataGenerator } = grpc.credentials;
const { Metadata } = grpc;

const generate = (macaroon: Buffer<ArrayBufferLike> | undefined) => {
  const metadata = new Metadata();

  try {
    metadata.add('macaroon', macaroon!.toString('hex'));
  } catch (err) {
    Logger.error('Error adding macaroon to metadata', err);
  }

  return metadata;
};

/** Credentials for gRPC

  {
    [cert]: <Base64 or Hex Serialized LND TLS Cert>
    [macaroon]: <Base64 or Hex Serialized Macaroon String>
  }

  @throws
  <Error>

  @returns
  {
    credentials: <gRPC Credentials Object>
  }
*/
export default ({ cert, macaroon }: { cert?: string; macaroon?: string }): { credentials: grpc.ChannelCredentials } => {
  if (!cert) {
    throw new Error('ExpectedCertToCreateCredentials');
  }

  if (!macaroon) {
    return { credentials: grpcSsl({ cert }).ssl };
  }

  const mac = decodeSerialized({ serialized: macaroon }).decoded;

  if (!mac) {
    generate(mac);

    throw new Error('ExpectedBase64OrHexEncodedMacaroonToCreateCredentials');
  }

  const creds = createFromMetadataGenerator((_, c) => c(null, generate(mac)));
  const { ssl } = grpcSsl({ cert });

  return { credentials: combineChannelCredentials(ssl, creds) };
};
