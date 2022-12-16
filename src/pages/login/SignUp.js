import Cheers from "../../segments/Cheers";
import {Link} from "react-router-dom";

const SignUpPage = () => {
    return (
        <div>
            <Cheers width={300} height={300} loop={true}/>
            <div>
                <h1 className="text-title">Sign up</h1>

                <h2 className="field-title">Username</h2>
                <input className="field" placeholder="Enter username here"/>
                <div style={{margin: 50}}/>

                <h2 className="field-title">Password</h2>
                <input className="field" placeholder="Enter password here"/>
                <div style={{margin: 50}}/>

                <h2 className="field-title">Gamer tag</h2>
                <input className="field" placeholder="Enter gamer tag of your choice"/>
                <div style={{margin: 50}}/>

                <h2 className="field-title">Email address</h2>
                <input className="field" placeholder="Enter your email address"/>
                <div style={{margin: 50}}/>
                <div className="parent"><button className="rounded_button" onClick={() => {}}>Sign up</button></div>

                <div style={{margin: 20}}/>
                <u><p style={{textAlign: "center"}}><Link to="/login/signin">Already have an account?</Link></p></u>

            </div>
        </div>
    );
}

export default SignUpPage;