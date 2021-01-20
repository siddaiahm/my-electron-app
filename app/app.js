//React libraries
import React from 'react';
import ReactDOM from 'react-dom';
import Routes from "./routes"
function App(){
    return (
      <Routes />
    );
}

// Render to index.html
ReactDOM.render(
  <App />,
  document.getElementById('root')
);
