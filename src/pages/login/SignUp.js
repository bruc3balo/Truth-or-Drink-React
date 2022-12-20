import Cheers from "../../segments/Cheers";
import {Link, useNavigate} from "react-router-dom";
import {useEffect, useRef, useState} from "react";
import {emailHasError, gamerTagHasError, passwordHasError, usernameHasError} from "../../validations/validations";
import {sendFetchRequest, todApi} from "../../constants/constants";
import useLocal from "../../hooks/useLocal";

const SignUpPage = () => {

    //data
    const username = useRef("")
    const password = useRef("")
    const gamerTag = useRef("")
    const email = useRef("")

    //fields
    const usernameFieldRef = useRef(null)
    const passwordFieldRef = useRef(null)
    const gamerTagFieldRef = useRef(null)
    const emailFieldRef = useRef(null)


    //errors
    const [usernameError, setUsernameError] = useState(null)
    const [passwordError, setPasswordError] = useState(null)
    const [gamerTagError, setGamerTagError] = useState(null)
    const [emailError, setEmailError] = useState(null)

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
    function validateGamerTag() {
        gamerTag.current = gamerTagFieldRef.current.value
        setGamerTagError(gamerTagHasError(gamerTag.current))
    }
    function validateEmail() {
        email.current = emailFieldRef.current.value
        setEmailError(emailHasError(email.current))
    }
    async function signUp() {
        if (!usernameError && !passwordError && !gamerTagError && !emailError) {
            setLoading(true)
            let {data: apiResponse, error} = await sendFetchRequest({
                method: "POST",
                url: todApi("auth/signup"),
                body: {"username": username.current, "password": password.current, "gamer_tag" : gamerTag.current, "email":email.current}
            })

            if(apiResponse.statusCode === 201) {
               await signIn();
            }
        }
    }
    async function signIn() {
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

    useEffect(() => {
        setOperation({method: "get", collection: "auth"}).then(() => {
            if (getResult()) navigate("/game", {replace: true})
        })
    }, [])

    return (
        <div>
            <Cheers width={300} height={300} loop={true}/>
            <div>
                <h1 className="text-title">Sign up</h1>

                <h2 className="field-title">Username</h2>
                <input className="field" onChange={validateUsername} ref={usernameFieldRef} placeholder="Enter username here"/>
                {usernameError && <p className="error">{usernameError}</p>}

                <div style={{margin: 50}}/>

                <h2 className="field-title">Password</h2>
                <input className="field" onChange={validatePassword} ref={passwordFieldRef} placeholder="Enter password here"/>
                {passwordError && <p className="error">{passwordError}</p>}

                <div style={{margin: 50}}/>

                <h2 className="field-title">Gamer tag</h2>
                <input className="field" onChange={validateGamerTag} ref={gamerTagFieldRef} placeholder="Enter gamer tag of your choice"/>
                {gamerTagError && <p className="error">{gamerTagError}</p>}

                <div style={{margin: 50}}/>

                <h2 className="field-title">Email address</h2>
                <input className="field" onChange={validateEmail} ref={emailFieldRef} placeholder="Enter your email address"/>
                {emailError && <p className="error">{emailError}</p>}

                <div style={{margin: 50}}/>

                <div className="parent"><button className="rounded_button" onClick={signUp}>Sign up</button></div>

                <div style={{margin: 20}}/>

                <u><p style={{textAlign: "center"}}><Link to="/login/signin">Already have an account?</Link></p></u>

            </div>
        </div>
    );
}

export default SignUpPage;