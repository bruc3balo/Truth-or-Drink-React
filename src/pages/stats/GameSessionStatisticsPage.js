import {useParams} from "react-router-dom";

const GameSessionStatisticsPage = () => {
    const {id} = useParams()

    return (
        <div>
            <div>GameSessionStatisticsPage {id}</div>
        </div>
    );
}

export default GameSessionStatisticsPage