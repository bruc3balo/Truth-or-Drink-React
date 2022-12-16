import {useEffect, useState} from "react";
import {ApiResponse} from "../models/models";


const useFetch = ({url, extraHeaders, method}) => {


    const [data, setData] = useState(null)
    const [isLoading, setLoading] = useState(true);
    const [error, setError] = useState(null)

    // const abortController = new AbortController();
    

    useEffect(() => {
            console.log("Sending "+ url)
            fetch(url, {
                // signal: abortController.signal,
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
                } ,
                method: method

            })
                .then(response => ApiResponse.from(response))
                .then(json => {
                    // eslint-disable-next-line no-undef
                    console.log(json)
                    setData(json)
                    setLoading(false)
                    setError(null)
                    // console.log(json)
                })
                .catch((error) => {
                if(error.name === 'AbortError') return;
                setLoading(false)
                setError(error.message)
            })
        // return () => abortController.abort();
    }, [url]);
    //url as dependency to rerun when url changes


    return {data, isLoading, error}
}

export default useFetch;