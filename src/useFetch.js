import {useEffect, useState} from "react";

const useFetch = ({url}) => {


    const [data, setData] = useState(null)
    const [isLoading, setLoading] = useState(true);
    const [error, setError] = useState(null)


    useEffect(() => {
        setTimeout(() => {
            fetch(url)
                .then(response => {
                    if(!response.ok) throw Error(response.statusText)

                    return response.json()
                })
                .then(json => {
                    setData(json)
                    setLoading(false)
                    setError(null)
                    // console.log(json)
                }).catch((error) => {
                setLoading(false)
                setError(error.message)
            })
        }, 1000)
    }, [url])
    //url as dependency to rerun when url changes

    return {data, isLoading, error}
}

export default useFetch;