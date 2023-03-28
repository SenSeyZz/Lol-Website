import * as MatchId from "./GetMatchId"


export var participants

//Async function to get the match stats from the API 
export async function getMatchstats(){
    var link = `https://europe.api.riotgames.com/lol/match/v5/matches/${MatchId.matchId}?api_key=RGAPI-1c881f2a-4d40-4e76-bd34-cd60c0d46ad5` 
    return fetch(link)
        .then((response) => response.json())
        .then((data) => {return participants =data.info.participants, console.log(participants)}) 
}