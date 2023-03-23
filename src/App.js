import React from 'react';
import { useEffect, useState } from 'react';

function App(){

  var wOrl

  let p = new Promise((resolve, reject) => {

    var str,
    element = document.getElementById('SummName');
    if (element != null) {
      str = element.value;
      resolve("Resolved")
    }
    else {
      str = null;
    reject("Rejected")
    }
    
  })


  p.then(()=>{
    getPuuid()
  }).then(()=>{
    getMatchId()
  }).then(()=>{
    getMatchstats()
  }).then(()=>{
    jsp()
  })


    function getName (){
      
      setSummonerName( document.getElementById("SummName").value)
      
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
          .then((data) => {setMatchStats(data.info.participants)});

          
  }

  function jsp(){

    var puuid = SummonerPuuid
    var participants = matchStats
    for (let i = 0; i < participants.length; i++) {
      if (participants[i].puuid == puuid) {
        var win= {
          name: participants[i].championName,
          win: participants[i].win,
        };
        setMatchStatsChamp(win.name)
        setMatchStatsWin(win.win)
      }
    
    }
    
  }

 


  const [summonerName, setSummonerName] = useState([])
  const [SummonerPuuid, setSummonerPuuid] = useState([])
  const [MatchId, setMatchId] = useState([])
  const [matchStats, setMatchStats] = useState([])
  const [matchStatsChamp, setMatchStatsChamp] = useState([])
  const [matchStatsWin, setMatchStatsWin] = useState([])


  const summPuuid = SummonerPuuid

  return( 
    <div>
      <textarea id="SummName">SenSayz</textarea>
      <button onClick={getName} type ="button">Submit</button>

      <h2>{summonerName}</h2>
      <h2>{matchStatsChamp}</h2>
      
      
      

    </div>
  )
}
  


export default App;
