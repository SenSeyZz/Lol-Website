import * as MatchId from "./GetMatchId"


export let participants = []

//Async function to get the match stats from the API 
export async function getMatchstats(){

    var nbGame= document.getElementById("gameNb").value
    
    for (let i = 0; i< MatchId.matchId.length - (20-nbGame); i++ ){
        console.log(i);
        
            var link = `https://europe.api.riotgames.com/lol/match/v5/matches/${MatchId.matchId[i]}?api_key=RGAPI-1c881f2a-4d40-4e76-bd34-cd60c0d46ad5` 
         await fetch(link)
            .then((response) => response.json())
            .then((data) => {if (participants.length < nbGame){participants.push(data.info.participants)} else {console.log(participants.length)}}) 
    }
    console.log(participants);
    return participants
    
}