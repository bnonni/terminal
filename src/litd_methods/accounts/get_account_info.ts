import { auto } from 'async';
import { returnResult } from '../../utils/asyncjs_util.js';
import isLitd from '../../utils/is_litd.js';
import { Litd } from '../../litd_grpc/types.js';
import TapdError from '../../utils/litd_error.js';
import { Callback } from '../../utils/types.js';
import { AccountInfoRequest } from '../types.js';

// const connectFailMessage = '14 UNAVAILABLE: Connect Failed';
const method = 'accountInfo';
const type = 'default';

/** <Insert Description Here>

 * @param {Object} params; {@link AccountInfoRequest}
  { }

  @returns via cbk or Promise
  { }
*/
interface Addr {
    encoded: string;
    asset_id: string;
    asset_type: string;
    amount: string;
    group_key: string;
    script_key: string;
    internal_key: string;
    tapscript_sibling: string;
    taproot_output_key: string;
    proof_courier_addr: string;
    asset_version: string;
    address_version: string;
}

export default ({ id, label, litd }: AccountInfoRequest, cbk: Callback) => {
    return new Promise((resolve, reject) => {
        return auto({
            // Check arguments
            validate: cbk => {
                // TODO: Add more checks to args

                if (!isLitd({ litd, method, type })) {
                    return cbk(new TapdError([400, 'ExpectedLitdForAccountInfo']));
                }

                return cbk();
            },

            // Get account info
            getInfo: ['validate', ({ litd, id, label }, cbk) => {
                return litd.default.accountInfo({ id, label },
                    (err: Error, res: Addr) => {
                        if (!!err) {
                            return cbk(err);
                        }

                        if (!res) {
                            return cbk(new TapdError([503, 'ExpectedResponseForAccountInfo']));
                        }

                        // TODO: Add more checks to response

                        return cbk(null, res);
                    });
            }],
        }, returnResult({ reject, resolve, of: 'getInfo', cbk }));
    });
};
