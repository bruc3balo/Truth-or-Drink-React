import Cheers from "../../segments/Cheers";
import {Link} from "react-router-dom";

const SignInPage = () => {
    return (
        <div>
            <Cheers width={300} height={300} loop={true}/>
            <div>
                <h1 className="text-title">Sign in</h1>
                <h2 className="field-title">Username</h2>
                <input className="field" placeholder="Enter username here"/>
                <div style={{margin: 50}}/>
                <h2 className="field-title">Password</h2>
                <input className="field" placeholder="Enter password here"/>
                <div style={{margin: 20}}/>
                <u><p style={{textAlign: "end"}}>Forgot Password?</p></u>
                <div style={{margin: 50}}/>
                <div className="parent"><button className="rounded_button" onClick={() => {}}>Sign in</button></div>
                <div style={{margin: 20}}/>
                <u><p style={{textAlign: "center"}}><Link to="/login/signup">Don't have an account?</Link></p></u>

            </div>
        </div>
    );
}

export default SignInPage;