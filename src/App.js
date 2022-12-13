import Cheers from "./Cheers";
import React, {useState, useEffect} from "react";
import PlayerList from "./PlayerList";
import useFetch from "./useFetch";


function App() {

    const [page, setPage] = useState('splashscreen')
    const goToWelcomePage = (event) => {
        setPage("Welcome");
        console.log("Welcome mlevi", event)
    }


    // const tod = {title: "Truth OR Drink", link : "https://truthordrink-44d9a.web.app/"}

    const {data: players , isLoading, error} = useFetch({url: 'http://localhost:4000/players'},)

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
              {error && <div style={{color: "red"}}> {error} </div>}
              {isLoading && <div> Loading... </div>}
              {players && <PlayerList players={players.filter((p) => p.id)}/>}
          </div>
      </div>
    );

}




export default App;
