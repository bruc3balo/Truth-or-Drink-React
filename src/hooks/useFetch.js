import {useRef} from "react";
import {ApiResponse} from "../models/models";

const useFetch = () => {


    const data = useRef(null);
    const error = useRef(null);
    const loading = useRef(false);

    const headers = {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
    }

    async function setFetchOperation({url, extraHeaders = {}, method, body}) {
        resetData()
         await fetch(url, {
            // signal: abortController.signal,
            headers: {...headers, ...extraHeaders},
            method: method,
            body: body && JSON.stringify(body)
        })
            .then(response => ApiResponse.fromBase64(response))
            .then(apiResponse => {
                console.log(apiResponse)
                data.current = apiResponse;
                error.current = null;
            }).catch(e => error.current = e)
    }

    function resetData ()  {
        data.current = null
        error.current = null
    }

    function getData() {
        return data.current
    }

    function getError () {
        return error.current
    }

    function isLoading() {
        return loading.current
    }

    return {getData, isLoading, getError, setFetchOperation}

}

export default useFetch;
