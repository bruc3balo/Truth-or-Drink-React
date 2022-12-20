import {Navigate, Route, Routes} from "react-router-dom";
import GamePage from "./GamePage";
import GameSessionPage from "./GameSessionPage";
import React from "react";

export function GameRoutes() {
    return (
        <Routes>
            <Route index element={<GamePage/>}/>
            <Route path="session" element={<Navigate to="/game" replace={true}/>}/>}/>
            <Route path="session/:id" element={<GameSessionPage/>}/>
        </Routes>
    );
}