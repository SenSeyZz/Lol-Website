import React from 'react';
import { useEffect, useState } from 'react';
import parse from 'html-react-parser';

// My own imports
import * as Name from "./API/GetName"
import * as Puuid from "./API/GetPuuid"
import * as MatchId from "./API/GetMatchId"
import * as MatchStats from "./API/GetStats"

export function ApiData(){

 const [stock, setStock] = useState([])
 const [participant, setParticipant] = useState([MatchStats.participants])
 const [summonerName, setSummonerName] = useState([])
 

 useEffect(() => {
  setParticipant(MatchStats.participants)
}, [MatchStats.participants])

 async function gameStats(){

    
    let i = 0
    
    var csBefore10
    var wOrL
    let stock = []
    var statistiques
  
         
      console.log(participant);
    

    //Loop through the participants to get the one with matching PUUID and then get the stats we want
    for ( i = 0; i < participant.length; i++) {
      let participantGame = participant[i]
      

      for (let j = 0; j< participantGame.length  ; j++){
       
        if (participantGame[j].puuid === Puuid.puuid) {
          statistiques= {
           //Normal stats
           name: participantGame[j].championName,
           win: participantGame[j].win,
           death : participantGame[j].deaths,
           position: participantGame[j].individualPosition,
 
           // Stats from the challenges part
           damagePerMinute: Math.round(participantGame[j].challenges.damagePerMinute),
           damagePercent: Math.round(participantGame[j].challenges.teamDamagePercentage *100),
           totalDamage: participantGame[j].totalDamageDealt,
 
           csBefore10: participantGame[j].challenges.laneMinionsFirst10Minutes,
           csAdvantage: Math.round(participantGame[j].challenges.maxCsAdvantageOnLaneOpponent),
 
           lvlAdvantage: participantGame[j].challenges.maxLevelLeadLaneOpponent,
           dodges: participantGame[j].challenges.skillshotsDodged,
         
       };
       //Set all the values to the ones we got from the API
         // Idea: jsut make One constant and set it the value of all the variables (i.e setResult({summonerName}, He was playing {{statistiques.name} ... ))

         if(statistiques.csBefore10 <= 50){
           
          csBefore10 = " Not even 50 he sucks at farming."
                      
         }else if (50 <statistiques.csBefore10 < 100){
           
          csBefore10 = " Good job."
             
         }else {
           
          csBefore10 =" perfect CS ! Respect."
            
         }


         var winOrLoose = statistiques.win

         if(winOrLoose){
          wOrL = " He won this match"
        }else{
          wOrL = "He lost this match"
         
        }


        
          var sentence = `
              Match number ${i+1}, He was playing <strong>${statistiques.name}</strong>. His role was <strong>${statistiques.position.toLowerCase()}.</strong> ${wOrL}<br/>
              He died <strong>${statistiques.death}</strong> times during this game<br/>
              He dealt <strong>${statistiques.damagePerMinute}</strong> damage per minute or <strong> ${statistiques.totalDamage}</strong> total.<br/>
              Which represents <strong>${statistiques.damagePercent}%</strong> of his team total damage.<br/>
              He had <strong>${statistiques.csBefore10}</strong> CS before 10 minutes.${csBefore10} He had <strong>${statistiques.csAdvantage}</strong> CS more than his lane opponent. And was <strong>${statistiques.lvlAdvantage}</strong> levels ahead.<br/>
              He dodged <strong>${statistiques.dodges}</strong> skill shots.<br/><br/>`


          stock.push(parse(sentence) )
    
      }  
    
     setStock(stock)

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
        <input style={{width: 300}} type="number" placeholder='How many games do you want ?' id="gameNb"></input>
        
        <p className='text-md-left'>{summonerName}</p>
        <p>{stock}</p>
             
      </div>
    </div>
      )

}

