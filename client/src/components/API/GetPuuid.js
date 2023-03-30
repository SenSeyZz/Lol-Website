import * as Name from "./GetName"

export var puuid


//Async function to get the Summoner Id from the API 
export async function getPuuid(){
    let link  = `https://euw1.api.riotgames.com/lol/summoner/v4/summoners/by-name/${Name.charName}?api_key=RGAPI-1c881f2a-4d40-4e76-bd34-cd60c0d46ad5`
    //Returning the "Fetch" allows us to return puuid in the .then() such that its value will be updated before we call the next function
     return fetch(link)
        .then((response) => response.json())
        .then((data)=> {
          puuid = data.puuid;
          return puuid
        })
    }