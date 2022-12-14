import {useParams} from "react-router-dom";

const GameSessionPage = () => {

    const {id} = useParams()

    return (
        <div>
            <div>Game session {id}</div>
        </div>
    );
}

export default GameSessionPage;