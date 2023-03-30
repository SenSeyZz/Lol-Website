import * as ApiData from "../ApiData"
import Navbar from '../Navbar';

function Stats (){
    return(
    <div>
      {Navbar()} 
      <br/>
      <br/> 
      {ApiData.ApiData()}
    </div>
    )
}

export default Stats;