import  ReactDOM  from "react-dom/client";
import { APP } from "./App";
import { BrowserRouter, HashRouter } from "react-router-dom";
import "./index.css"
let root=ReactDOM.createRoot(document.getElementById("root"))

root.render(
    <HashRouter> 
            <APP/>
    </HashRouter> 



)