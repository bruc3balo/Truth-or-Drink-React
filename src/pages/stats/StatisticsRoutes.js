import {Route, Routes} from "react-router-dom";
import React from "react";
import GameSessionStatisticsPage from "./GameSessionStatisticsPage";
import StatisticsPage from "./StatisticsPage";

export function StatisticsRoutes() {
    return (
        <Routes>
            <Route index element={<StatisticsPage/>}/>
            <Route path=":id" element={<GameSessionStatisticsPage/>}/>
        </Routes>
    );
}