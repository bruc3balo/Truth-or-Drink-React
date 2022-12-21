import Cheers from "../../segments/Cheers";
import {Link, useNavigate} from "react-router-dom";
import {passwordHasError, usernameHasError} from "../../validations/validations";
import {useEffect, useState, useRef} from "react";
import {sendFetchRequest, todApi} from "../../constants/constants";
import useLocal from "../../hooks/useLocal";

const SignInPage = () => {

    //data
    const username = useRef("")
    const password = useRef("")

    //fields
    const usernameFieldRef = useRef(null)
    const passwordFieldRef = useRef(null)

    //errors
    const [usernameError, setUsernameError] = useState(null)
    const [passwordError, setPasswordError] = useState(null)

    const [loading, setLoading] = useState(false)
    const {isDBLoading, getError, setOperation, getResult} = useLocal();
    const navigate = useNavigate()

    function validateUsername() {
        username.current = usernameFieldRef.current.value
        setUsernameError(usernameHasError(username.current))
    }
    function validatePassword() {
        password.current = passwordFieldRef.current.value
        setPasswordError(passwordHasError(password.current))
    }
    async function signIn() {
        if (!usernameError && !passwordError) {
            setLoading(true)
            let {data: apiResponse, error} = await sendFetchRequest({
                method: "POST",
                url: todApi("auth/signin"),
                body: {"username": username.current, "password": password.current}
            })

            if(apiResponse.statusCode === 200) {
               await setOperation({method: "post", data:apiResponse.data.access_token, collection: "auth" })
                if(getResult()) {
                    navigate("/game", {replace: true})
                } else {
                    console.log(getError())
                }
            }
            setLoading(false)
        }
    }


    useEffect(() => {
         setOperation({method: "get", collection: "auth"}).then(() => {
            if (getResult()) navigate("/game", {replace: true})
        })

    },[])

    return (
        <div>
            <Cheers width={300} height={300} loop={true}/>
            <div>
                <h1 className="text-title">Sign in</h1>

                <h2 className="field-title">Username</h2>
                <input className="field" onChange={validateUsername} ref={usernameFieldRef} placeholder="Enter username here" />
                {usernameError && <p className="error">{usernameError}</p>}

                <div style={{margin: 50}}/>

                <h2 className="field-title">Password</h2>
                <input className="field" onChange={validatePassword} ref={passwordFieldRef} inputMode="password" placeholder="Enter password here"/>
                {passwordError && <p className="error">{passwordError}</p>}

                <div style={{margin: 20}}/>

                <u><p style={{textAlign: "end"}}>Forgot Password?</p></u>

                <div style={{margin: 50}}/>

                <div className="center-column">
                    <button className="rounded_button" onClick={signIn}>Sign in
                    </button>
                </div>

                <div style={{margin: 20}}/>

                <u><p style={{textAlign: "center"}}><Link to="/login/signup">Don't have an account?</Link></p></u>
            </div>
        </div>
    );
}

export default SignInPage;