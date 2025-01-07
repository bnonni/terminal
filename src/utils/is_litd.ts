import { IsTapdResponse } from "../litd_grpc/types.js";

/** Determine if object is an expected LND Object

  {
    [lnd]: <LND Object>
    [method]: <Method Name String>
    [type]: <Method Type String>
  }

  @returns
  <Is Expected LND Object Bool>
*/
export default ({ litd, method, type }: IsTapdResponse) => {
  return !!litd && !!litd[type] && !!litd[type][method];
};