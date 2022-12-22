import Cheers from "../../segments/Cheers";
import userIcon from "../../static/user.png"
import useLocal from "../../hooks/useLocal";
import {useEffect, useState} from "react";
import {sendFetchRequest, todApi} from "../../constants/constants";
import {MyUser} from "../../models/models";
import {useNavigate} from "react-router-dom";

const GamePage = () => {

    const {isDBLoading, getError, setOperation, getResult} = useLocal();
    const [user, setUser] = useState(null);
    const navigate = useNavigate();

    function goToProfile () {
        navigate("/profile")
    }
    function host () {
        navigate("/game/host")
    }

    function join () {
        navigate("/game/join")
    }

    function getUser() {
        setOperation({method: "get", collection: "auth"}).then(() => {
            let token = getResult()
            if(!token) {
                console.log("Token missing")
                return;
            }
            token = token.token;
            sendFetchRequest({
                url: todApi("auth/me"),
                method: "GET",
                extraHeaders: {'Authorization': "Bearer " +token}
            }).then(({data: apiResponse, error}) => {
                let myUser = MyUser.fromApiResponse(apiResponse);
                setUser(myUser)
                setOperation({method: "post", collection: "user", data: myUser}).then(() => {
                    console.log(myUser)
                })
            })
        })

    }

    useEffect(() => {
        getUser()
    }, [])

    return (
        <div>

            <div>
                <div className="appbar-trailing" onClick={goToProfile}>
                    <img style={{marginRight: 75}} width={30} height={30} src={userIcon} alt="user icon"/>
                    {user && <h1 className="appbar-username">{user.username}</h1>}
                </div>
            </div>

            <Cheers/>
            <div style={{margin: 20}}/>

            <div className="center-column">
                <button className="rounded_button" onClick={host}>HOST</button>
            </div>


            <div className="center-column">
                <button className="rounded_button" onClick={join}>JOIN</button>
            </div>

        </div>
    );
}

export default GamePage;