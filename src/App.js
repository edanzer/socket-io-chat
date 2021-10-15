import SessionContext from "./contexts/session";
import Chat from "./layout/Chat";
import logo from "./images/brandlive_logo.svg";
import "./App.scss";

function App() {
  return (
      <SessionContext.Provider>
        <div className="app">
          <header className="app-header">
            <img src={logo} className="app-logo" alt="logo" />
            <span className="app-motto">
              Brandlive Telly Chat - Code Challenge
            </span>
          </header>
          <Chat />
        </div>
      </SessionContext.Provider>
  );
}

export default App;
