import React  from 'react';

const PlayerList = ({players}) => {



    return (
        <div className="player-list">
            {players.map((p) => (
                <div className="player-preview" key={p.id}>
                    <h2>{p.name}</h2>
                    <p>Also known as </p>
                    <h3>{p.nickname}</h3>
                </div>
            ))}
        </div>
    );
}

export default PlayerList;