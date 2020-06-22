import React, { useEffect } from 'react';
import logo from './logo.svg';
import './App.css';

const rootUrl = "https://football-rest-api.azurewebsites.net";

async function fetchPlayerFavoriteColorWithAsyncAwait(): Promise<string> {
  let playerResponse = await fetch(rootUrl + "/player");

  let playerIds: number[] = await playerResponse.json();
  let playerId: number = playerIds[0];

  playerResponse = await fetch(rootUrl + "/player/" + playerId);
  let playerDetails = await playerResponse.json();

  let colorResponse = await fetch(rootUrl + "/color/" + playerDetails.favoriteColorId);
  let color = await colorResponse.json();

  return color.colorName;

}

function fetchPlayerFavoriteColor() {
  fetch(rootUrl + "/player")
  .then(response => response.json())
  .then((response: number[]) => {
    fetch(rootUrl + "/player/" + response[0])
    .then(response => response.json())
    .then(response => {
      fetch(rootUrl + "/color/" + response.favoriteColorId)
      .then(response =>   response.json())
      .then(response => console.log(response))
    })
  });
}

function App() {
   
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        
        <p>
          Edit <code>src/App.tsx</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header>
    </div>
  );
}

export default App;
