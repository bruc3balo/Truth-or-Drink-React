import React from "react";
import Splashscreen from "./pages/splashscreen/Splashscreen";
import {Route, Routes} from 'react-router-dom';
import WelcomePage from "./pages/welcome/Welcome";
import Lost404Page from "./pages/errors/404";
import {GameRoutes} from "./pages/game/GameRoutes";
import FeedbackPage from "./pages/feedback/Feedback";
import ProfilePage from "./pages/profile/Profile";
import NoServicePage from "./pages/errors/NoService";
import {StatisticsRoutes} from "./pages/stats/StatisticsRoutes";
import {LoginRoutes} from "./pages/login/LoginRoutes";

function App() {

    return (
        <>
            <Routes>
                <Route path="/" element={<Splashscreen/>}/>
                <Route path="/welcome" element={<WelcomePage/>}/>
                <Route path="/login/*" element={<LoginRoutes/>}/>
                <Route path="/game/*" element={<GameRoutes/>}/>
                <Route path="/profile" element={<ProfilePage/>}/>
                <Route path="/feedback" element={<FeedbackPage/>}/>
                <Route path="/stats/*" element={<StatisticsRoutes/>}/>
                <Route path="/503" element={<NoServicePage/>}/>
                <Route path="*" element={<Lost404Page/>}/>
            </Routes>
        </>
    );

}


export default App;
