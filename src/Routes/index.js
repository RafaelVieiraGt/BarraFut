import { Routes, Route } from "react-router-dom";

import LoginRegister from "../Pages/LoginRegister";
import Home from "../Pages/Home";
import Private from "./private";
import CreateFut from "../Pages/CreateFut";

export default function RoutesApp(){
    return(
        <Routes>
            <Route path="/" element={<LoginRegister/>} />
            <Route path="/feed" element={ <Private><Home/></Private> } />
            <Route path="/createfut" element={<Private><CreateFut/></Private>} />
        </Routes>
    )
}