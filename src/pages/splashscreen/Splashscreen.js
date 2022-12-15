import Cheers from "../../Cheers";
import {Navigate, useNavigate} from "react-router-dom";
import useFetch from "../../hooks/useFetch";
import {apiUrl} from "../../constants/constants";


const SplashScreenPage = () => {

    const {data: apiResponse, error, isPending} = useFetch({url: `${apiUrl}/splashscreen`, method: "POST"})

    return (
        <div>
            <Cheers/>
            {isPending && <div>Loading...</div>}
            {apiResponse && apiResponse.statusCode === 200 && <Navigate to="/welcome" replace={true}/>}
            {error && <Navigate to="/503" replace={true}/>}
        </div>
    );
}

export default SplashScreenPage;