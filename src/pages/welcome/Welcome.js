import Cheers from "../../segments/Cheers";
import {useState} from "react";
import { useNavigate } from 'react-router-dom';


const WelcomePage = () => {

    const rules = ["#Grab your drinks","#Grab your friends","#Bring your questions"]
    const instructions = ["1. Pick a category","2. Ask your burning question","3. Set maximum number of times allowed to drink", "4. Have fun"]

    const [page, setPage] = useState(0);
    const [data, setData] = useState(rules);
    const navigate = useNavigate();

    return (
        <div>
            <Cheers width={300} height={300} loop={true}/>
            <h1 className="neon-light">#Welcome</h1>
            <h3 className="neon-light">#TOD</h3>
            <div className="instructions">
                <h3 className="text-title"><u style={{margin: 40}}>{page === 0 ? "The rules are simple:" : "Instructions"}</u></h3>
                {data.map((m, i) => (
                    <ul className="ul" key={i}>{m}</ul>
                ))}
                <button className="rounded_button" onClick={() => {
                    switch (page) {
                        default:
                        case 0:
                        setPage(1)
                        setData(instructions)
                        break;

                        case 1:
                        navigate("/login/signin", {replace: true})
                        break;
                    }
                }}>Next</button>
            </div>
        </div>
    );
}

export default WelcomePage;