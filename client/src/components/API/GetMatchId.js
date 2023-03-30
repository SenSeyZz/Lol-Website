import * as Puuid from "./GetPuuid"

 export let matchId = []

 //Async function to get the match Id from the API 
 export async function getMatchId(){
    var link = `https://europe.api.riotgames.com/lol/match/v5/matches/by-puuid/${Puuid.puuid}/ids?start=0&count=20&api_key=RGAPI-1c881f2a-4d40-4e76-bd34-cd60c0d46ad5`
    return fetch(link)
        .then((response) => response.json())
        .then((data) => {return matchId = data, console.log(data);} );
  }