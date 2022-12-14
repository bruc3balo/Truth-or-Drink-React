import Cheers from "../../Cheers";
import { useNavigate } from "react-router-dom";

function GoToWelcomePage () {
    const nav = useNavigate()
     nav("/welcome", {replace: true, state: {}})
}

const Splash = () => {
    return (
        <div>
            <Cheers/>
            <div>Loading...</div>
            <button onClick={GoToWelcomePage}>Welcome</button>
            {/*<Link to="/login/signin" replace><button>Login</button></Link>*/}
        </div>
    );
}

export default Splash;