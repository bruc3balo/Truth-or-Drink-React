import {useParams} from "react-router-dom";

const GameJoinPage = () => {

    const {id} = useParams()

    return (
        <div>
            <div>Game join {id}</div>
        </div>
    );
}

export default GameJoinPage;