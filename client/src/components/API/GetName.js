
export var charName

//Async Function that checks if there is a value in the text 
export async function name(){
  
    if(document.getElementById("SummName").value !== null){
      charName =  document.getElementById("SummName").value.toString()
      console.log("resolve");
    }else{
      console.log("reject");
    }

}