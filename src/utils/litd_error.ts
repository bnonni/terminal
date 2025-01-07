export default class LitdError extends Error {
    code: number;
    constructor([code, message]: [number, string]) {
        super(message);
        this.name = 'LitdError';
        this.code = code;
    }
}