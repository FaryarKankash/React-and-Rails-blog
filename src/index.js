import App from "./App";
import CssBaseline from "@sonnat/ui/CssBaseline";
import SonnatInitializer from "@sonnat/ui/styles/SonnatInitializer";
import ReactDOM from "react-dom";
import theme from "./theme";
import '../node_modules/bootstrap/dist/css/bootstrap.min.css';
import { BrowserRouter } from "react-router-dom";

ReactDOM.render(
   <SonnatInitializer theme={theme}>
    <div id="main-wrapper">
      <CssBaseline />
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </div>
   </SonnatInitializer>,
   document.getElementById('root')
);
