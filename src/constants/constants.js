export const apiUrl = "http://192.168.1.103:5090/api"

export function isNullOrUndefined(o) {
    if(o === null) return true;
    return typeof o === 'undefined';
}