/*
import {useEffect, useState} from "react";
import {ApiResponse} from "../models/models";

const useFetch = ({url, extraHeaders = {}, method, body}) => {

    const [data, setData] = useState(null)
    const [isLoading, setLoading] = useState(true)
    const [error, setError] = useState(null)

    const headers = {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
    }

    // const abortController = new AbortController();

    useEffect(() => {
            console.log("Sending "+ url)
            fetch(url, {
                // signal: abortController.signal,
                headers: {...headers, ...extraHeaders},
                method: method,
                body: body

            })
                .then(response => ApiResponse.fromBase64(response))
                .then(json => {
                    // eslint-disable-next-line no-undef
                    console.log(json)
                    setData(json)
                    setError(null)
                    // console.log(json)
                })
                .catch((error) => {
                if(error.name === 'AbortError') return;
                setError(error.message)
            })
                .finally(() => setLoading(false))
        // return () => abortController.abort();
    }, [url, method, body]);
    //url as dependency to rerun when url changes

    return {data, isLoading, error}
}

export default useFetch;*/
