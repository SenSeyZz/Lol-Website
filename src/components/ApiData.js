import React from 'react';
import { useEffect, useState } from 'react';

// My own imports
import * as Name from "./API/GetName"
import * as Puuid from "./API/GetPuuid"
import * as MatchId from "./API/GetMatchId"
import * as MatchStats from "./API/GetStats"

export function ApiData(){

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

 async function gameStats(){

    var statistiques
    var participant = MatchStats.participants

    //Loop through the participants to get the one with matching PUUID and then get the stats we want
    for (let i = 0; i < participant.length; i++) {
      if (participant[i].puuid === Puuid.puuid) {
         statistiques= {
          //Normal stats
          name: participant[i].championName,
          win: participant[i].win,
          death : participant[i].deaths,
          position: participant[i].individualPosition,

          // Stats from the challenges part
          damagePerMinute: Math.round(participant[i].challenges.damagePerMinute),
          damagePercent: Math.round(participant[i].challenges.teamDamagePercentage *100),
          totalDamage: participant[i].totalDamageDealt,

          csBefore10: participant[i].challenges.laneMinionsFirst10Minutes,
          csAdvantage: participant[i].challenges.maxCsAdvantageOnLaneOpponent,

          lvlAdvantage: participant[i].challenges.maxLevelLeadLaneOpponent,
          dodges: participant[i].challenges.skillshotsDodged,
        
      };
      //Set all the values to the ones we got from the API
        // Idea: jsut make One constant and set it the value of all the variables (i.e setResult({summonerName}, He was playing {{statistiques.name} ... ))
        setMatchStatsChamp(
        <>
          was playing <span style={{ fontWeight: 'bold' }}>{statistiques.name}</span>.
        </>)
        
        setMatchStatsDeath(
          <>
            He died <span style={{ fontWeight: 'bold' }}>{statistiques.death}</span> times during this game
          </>
          
          )
        setMatchPosition(
          <>
            His role was <span style={{ fontWeight: 'bold' }}>{statistiques.position.toLowerCase()}.</span>
          </>
          
          )

        setMatchChallengeDamagePerMinute(
          <>
            He dealt <span style={{ fontWeight: 'bold' }}>{statistiques.damagePerMinute}</span> damage per minute or <span style={{ fontWeight: 'bold' }}> {statistiques.totalDamage}</span> total.
          </>
          
          )
        setMatchTeamDamage(
          <>
            Which represents <span style={{ fontWeight: 'bold' }}>{statistiques.damagePercent}%</span> of his team total damage
          </>
          
          )
       

        setMatchCsAdvantage(
          <>
          He had <span style={{ fontWeight: 'bold' }}>{statistiques.csAdvantage}</span> CS more than his lane opponent
          </>
          
          )
        setMatchLvlAdvantage(
          <>
            And was <span style={{ fontWeight: 'bold' }}>{statistiques.lvlAdvantage}</span> levels ahead.
          </>
          
          )
        setMatchDodges(
        <>
          He dodged <span style={{ fontWeight: 'bold' }}>{statistiques.dodges}</span> skill shots.
        </>
        
        )       

        if(statistiques.csBefore10 <= 50){
          setMatchCs10(
            <>
              He had <span style={{fontWeight: "bold"}}>{statistiques.csBefore10}</span> CS before 10 minutes. Not even 50 he sucks at farming.
            </>           
            )
        }else if (50 <statistiques.csBefore10 < 100){
          setMatchCs10(
            <>
              He had <span style={{fontWeight: "bold"}}>{statistiques.csBefore10}</span> CS before 10 minutes Good job.
            </>          
            )

        }else {
          setMatchCs10(
            <>
              He had <span style={{fontWeight: "bold"}}>{statistiques.csBefore10}</span> CS before 10 minutes perfect CS ! Respect.
            </>
            )
        }

        var winOrLoose = statistiques.win

      
      if(winOrLoose){
        setMatchStatsWin(" He won this match")
      }else{
        setMatchStatsWin("He lost this match")

      }
    }  
  }
}



//This is the function that is triggered when someone clicks on the submit buttons. It allows to pass all the functions in just one go
async function usePromise(){

    await Name.name()
    setSummonerName(Name.charName)
    await Puuid.getPuuid()
    await MatchId.getMatchId()
    await MatchStats.getMatchstats()
    await gameStats()
}



    return( 
      <div className='row justify-content-center'>
      <div className='col-sm-4'>
        <div className='input-group'>
          <textarea className='form-control' id='SummName' placeholder="Enter Your Summoner's Name"></textarea>
          <button className='btn btn-primary ml-2' onClick={usePromise}>Submit</button>
        </div>
        
          <p className='text-md-left'>{summonerName} {matchStatsChamp} {matchPosition} {matchStatsWin}</p>
          <p className='text-md-left'>{matchStatsDeath}</p>
          <p className='text-md-left'>{matchChallengeDamagePerMinute} {matchTeamDamage} </p>
          <p className='text-md-left'>{matchCs10} {matchCsAdvantage} {matchLvlAdvantage}</p>
          <p className='text-md-left'>{matchDodges}</p>      
      </div>
    </div>
      )

}

