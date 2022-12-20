import {ApiResponse} from "../models/models";
const apiUrl = "http://192.168.1.103:5090/api"
export const appName = "Truth or drink"
export function todApi(endpoint) {
    return`${apiUrl}/${endpoint}`
}

export async function sendFetchRequest({url, extraHeaders = {}, method, body}) {

    let data = null;
    let error = null;

    const headers = {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
    }

    await fetch(url, {
        // signal: abortController.signal,
        headers: {...headers, ...extraHeaders},
        method: method,
        body: body && JSON.stringify(body)
    })
        .then(response => ApiResponse.fromBase64(response))
        .then(apiResponse => {
            console.log(apiResponse)
            data = apiResponse;
            error = null;
        }).catch(e => error = e)

    return {data, error}
}