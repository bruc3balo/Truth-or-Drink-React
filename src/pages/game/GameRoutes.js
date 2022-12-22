import {Navigate, Route, Routes} from "react-router-dom";
import GamePage from "./GamePage";
import GameSessionPage from "./GameSessionPage";
import React from "react";
import GameHostPage from "./GameHostPage";
import GameJoinPage from "./GameJoinPage";

export function GameRoutes() {
    return (
        <Routes>
            <Route index element={<GamePage/>}/>
            <Route path="host" element={<GameHostPage/>}/>
            <Route path="join" element={<GameJoinPage/>}>
                <Route path=":id" element={<GameJoinPage/>}/>
            </Route>
            <Route path="session" element={<Navigate to="/game" replace={true}/>}/>}/>
            <Route path="session/:id" element={<GameSessionPage/>}/>
        </Routes>
    );
}