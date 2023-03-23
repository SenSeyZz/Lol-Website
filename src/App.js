import React from 'react';
import { useEffect, useState } from 'react';

function App(){

    function getName(){

      
      setSummonerName(document.getElementById("SummName").value)

    }

    function getPuuid(){
      fetch(`https://euw1.api.riotgames.com/lol/summoner/v4/summoners/by-name/${summonerName}?api_key=RGAPI-1c881f2a-4d40-4e76-bd34-cd60c0d46ad5`)
          .then((response) => response.json())
          .then((data) => setSummonerPuuid(data.puuid));
    }

    function getMatchId(){
      fetch(`https://europe.api.riotgames.com/lol/match/v5/matches/by-puuid/${summPuuid}/ids?start=0&count=20&api_key=RGAPI-1c881f2a-4d40-4e76-bd34-cd60c0d46ad5`)
          .then((response) => response.json())
          .then((data) => setMatchId(data[0]));
    }

    function getMatchstats(){
      fetch(`https://europe.api.riotgames.com/lol/match/v5/matches/${MatchId}?api_key=RGAPI-1c881f2a-4d40-4e76-bd34-cd60c0d46ad5`)
          .then((response) => response.json())
          .then((data) => {console.log(data.info.participants)
            
            var puuid = SummonerPuuid
            var participants = data.info.participants
            for (let i = 0; i < participants.length; i++) {
              if (participants[i].puuid == puuid) {
                var win= {
                  "name": participants[i].championName,
                  'win': participants[i].win,

                };
              }
              
              
            }
            setMatchStatsChamp(win.name)
            setMatchStatsWin(win.win)

    

          });

          
  }

  function winOrLoose() {
    if(matchStatsWin === true){
      setMatchStatsWin("Gagné")
      
    }
    else{
      setMatchStatsWin("Perdu")
    }

  }


  const [summonerName, setSummonerName] = useState([])
  const [SummonerPuuid, setSummonerPuuid] = useState([])
  const [MatchId, setMatchId] = useState([])
  const [matchStatsChamp, setMatchStatsChamp] = useState([])
  const [matchStatsWin, setMatchStatsWin] = useState([])


  const summPuuid = SummonerPuuid

  return( 
    <div>
      
      <h1>{summPuuid}</h1>
      <textarea id="SummName"></textarea>
      <button onClick={getName} type ="button">Submit</button>

      {summonerName.length > 0 && <div> 
      <button onClick={getPuuid} type ="button">Puuid</button>
      <button onClick={getMatchId} type ="button">Match</button>
      <button onClick={getMatchstats} type ="button">MatchStats</button>
      <button onClick={winOrLoose} type ="button">MatchStatsWin</button>
      </div> }


      <h2>{summonerName}</h2>
      <h2>{MatchId}</h2>
      <h2>{matchStatsChamp}</h2>
      <h2>{matchStatsWin}</h2>
      
      

    </div>
  )
}
  


export default App;
