import Cheers from "./Cheers";
import {useState} from "react";

function App() {

    const [page, setPage] = useState('splashscreen')
    const goToWelcomePage = (event) => {
        setPage("Welcome");
        console.log("Welcome mlevi", event)
    }

    const [players, addPlayers] = useState([
        {name: "Balo", nickname: "thewick3rman", id: 1},
        {name: "Ajey", nickname: "Nani dafaq", id: 2},
        {name: "Wangatia", nickname: "Ace", id: 3},
    ])

  // const tod = {title: "Truth OR Drink", link : "https://truthordrink-44d9a.web.app/"}
  return (
    <div className="App" style={{ alignContent: "center", margin: "60px auto", padding: "40px", justifyContent: "center", alignItems: "center"}}>
        <h1>{page}</h1>
        <header className="App-header">
        <Cheers/>
      </header>
        <div className="rivDiv">
           <button className="next" onClick={(event) => goToWelcomePage(event)}>Next</button>
       </div>
        <div className="rivDiv">
            {players.map((p) => (
                <div className="player-preview" key={p.id}>
                    <h2>{p.name}</h2>
                    <p>Also known as </p>
                    <h3>{p.nickname}</h3>
                </div>
            ))}
        </div>
    </div>
  );
}




export default App;
