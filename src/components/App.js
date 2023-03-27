import React from 'react';
import { useEffect, useState } from 'react';
import { BrowserRouter, Routes, Route } from "react-router-dom";

function App(){

  //Declare all the variable that i ll need 
  var charName
  var puuid
  var matchId
  var participants
  var winOrLoose

  //This is the function that is triggered when someone clicks on the submit buttons. It allows to pass all the functions in just one go
  async function usePromise(){
  await name()
  await getPuuid()
  await getMatchId()
  await getMatchstats()
  await gameStats()
  }
  
  //Async Function that checks if there is a value in the text 
  async function name(){
    
      if(document.getElementById("SummName").value !== null){
        charName =  document.getElementById("SummName").value.toString()
        setSummonerName(charName)
        console.log("resolve");
      }else{
        console.log("reject");
      }
  
  }

  //Async function to get the Summoner Id from the API 
   async function getPuuid(){
    let link  = `https://euw1.api.riotgames.com/lol/summoner/v4/summoners/by-name/${charName}?api_key=RGAPI-1c881f2a-4d40-4e76-bd34-cd60c0d46ad5`
    //Returning the "Fetch" allows us to return puuid in the .then() such that its value will be updated before we call the next function
     return fetch(link)
        .then((response) => response.json())
        .then((data)=> {
          puuid = data.puuid;
          return puuid
        })
    }

    //Async function to get the match Id from the API 
    async function getMatchId(){
      var link = `https://europe.api.riotgames.com/lol/match/v5/matches/by-puuid/${puuid}/ids?start=0&count=20&api_key=RGAPI-1c881f2a-4d40-4e76-bd34-cd60c0d46ad5`
      return fetch(link)
          .then((response) => response.json())
          .then((data) => {return matchId = data[0], console.log(data);});
    }

    //Async function to get the match stats from the API 
    async function getMatchstats(){
        var link = `https://europe.api.riotgames.com/lol/match/v5/matches/${matchId}?api_key=RGAPI-1c881f2a-4d40-4e76-bd34-cd60c0d46ad5` 
        return fetch(link)
            .then((response) => response.json())
            .then((data) => {return participants =data.info.participants, console.log(participants)}) 
  }

  async function gameStats(){

    //Loop through the participants to get the one with matching PUUID and then get the stats we want
    for (let i = 0; i < participants.length; i++) {
      if (participants[i].puuid === puuid) {
        var statistiques= {
          //Normal stats
          name: participants[i].championName,
          win: participants[i].win,
          death : participants[i].deaths,
          position: participants[i].individualPosition,

          // Stats from the challenges part
          damagePerMinute: Math.round(participants[i].challenges.damagePerMinute),
          damagePercent: Math.round(participants[i].challenges.teamDamagePercentage *100),
          totalDamage: participants[i].totalDamageDealt,

          csBefore10: participants[i].challenges.laneMinionsFirst10Minutes,
          csAdvantage: participants[i].challenges.maxCsAdvantageOnLaneOpponent,

          lvlAdvantage: participants[i].challenges.maxLevelLeadLaneOpponent,
          dodges: participants[i].challenges.skillshotsDodged,
        
          };

        //Set all the values to the ones we got from the API
            // Idea: jsut make One constant and set it the value of all the variables (i.e setResult({summonerName}, He was playing {{statistiques.name} ... ))
        setMatchStatsChamp(`was playing ${statistiques.name}.`)
        
        setMatchStatsDeath(`He died ${statistiques.death} times during this game`)
        setMatchPosition(`His role was ${statistiques.position}`)

        setMatchChallengeDamagePerMinute(`He dealt ${statistiques.damagePerMinute} damage per minute or ${statistiques.totalDamage} total.`)
        setMatchTeamDamage(`which represents ${statistiques.damagePercent}% of his team total damage`)
       

        setMatchCsAdvantage(`He had ${statistiques.csAdvantage} CS more than his lane opponent`)
        setMatchLvlAdvantage(`And was ${statistiques.lvlAdvantage} levels ahead.`)
        setMatchDodges(`He dodged ${statistiques.dodges} skill shots.`)       

        if(statistiques.csBefore10 <= 50){
          setMatchCs10(`He had ${statistiques.csBefore10} CS before 10 minutes. Not even 50 he sucks at farming.`)
        }else if (50 <statistiques.csBefore10 < 100){
          setMatchCs10(`He had ${statistiques.csBefore10} CS before 10 minutes Good job.`)

        }else {
          setMatchCs10(`He had ${statistiques.csBefore10} CS before 10 minutes perfect CS ! Respect.`)
        }

        winOrLoose = statistiques.win

      }
      if(winOrLoose){
        setMatchStatsWin(" He won this match")
      }else{
        setMatchStatsWin("He lost this match")
      }
    
    }

    
  }

  //Create all the constants we need to display the stats on the screen
  
  const [summonerName, setSummonerName] = useState([])
  const [matchStatsChamp, setMatchStatsChamp] = useState([])
  const [matchStatsWin, setMatchStatsWin] = useState([])
  const [matchStatsDeath, setMatchStatsDeath] = useState([])
  const [matchPosition, setMatchPosition] = useState([])
  const [matchChallengeDamagePerMinute, setMatchChallengeDamagePerMinute] = useState([])
  const [matchCs10, setMatchCs10] = useState([])
  const [matchCsAdvantage, setMatchCsAdvantage] = useState([])
  const [matchLvlAdvantage, setMatchLvlAdvantage] = useState([])
  const [matchDodges, setMatchDodges] = useState([])
  const [matchTeamDamage, setMatchTeamDamage] = useState([])

  return( 
    <div>
      <textarea id="SummName"></textarea>
      <button onClick={usePromise} type ="button">Submit</button>

      
      <p>{summonerName} {matchStatsChamp} {matchPosition} {matchStatsWin}</p>
      <p>{matchStatsDeath}</p>
      <p>{matchChallengeDamagePerMinute}{matchTeamDamage} </p>
      <p>{matchCs10} {matchCsAdvantage} {matchLvlAdvantage}</p>
      <p>{matchDodges}</p>
  

    </div>
  )
}
  


export default App;
