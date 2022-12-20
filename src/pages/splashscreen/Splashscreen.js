import Cheers from "../../segments/Cheers";
import {Navigate} from "react-router-dom";
import useFetch from "../../hooks/useFetch";
import {apiUrl, sendFetchRequest, todApi} from "../../constants/constants";
import {useEffect, useState} from "react";
import useLocal from "../../hooks/useLocal";

const SplashScreenPage = () => {

    let loading = 0;
    let failed = 1;
    let success = 2;

    const [hasLoggedIn, setHasLoggedIn] = useState(loading)
    const [splashState, setSplashState] = useState(loading)
    const {isDBLoading, getError, setOperation, getResult} = useLocal();


    useEffect(() => {

        sendFetchRequest({
            method: "POST",
            url: todApi("splashscreen"),
        }).then(async response => {
            if (response.data && response.data.statusCode === 200) {
                await setOperation({method: "get", collection: "auth"})
                if(getResult()) setHasLoggedIn(success)
                else setHasLoggedIn(failed)
                setSplashState(success)
                console.log((hasLoggedIn && !hasLoggedIn))
            } else setSplashState(failed)
        })

    }, [])

    return (
        <div>
            <Cheers/>
            {(splashState === loading || isDBLoading) && <div>Loading...</div>}
            {getError() && <div className="error"> {getError()} </div>}
            {(splashState === success && hasLoggedIn === failed) && <Navigate to="/welcome" replace={true}/>}
            {(splashState === success && hasLoggedIn === success) && <Navigate to="/game" replace={true}/>}
            {splashState === failed && <Navigate to="/503" replace={true}/>}
        </div>
    );
}

export default SplashScreenPage;