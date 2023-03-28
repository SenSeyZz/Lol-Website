
import Navbar from '../Navbar';
import "../Images/bg.jpg"

const Home = () => {

    // Need to find a fckn way to add a bg image there because I fckn can't aftrer 2h 
    return (
      <div>
        <div>
          {Navbar()}
          <br/>
        </div>
        <div className="bg-image mt-10" style={{ backgroundImage: "url(../Images/bg.jpg)" }}>
        <div className='container'>
          <div className='row'>
            <div className='col-md-8 offset-md-2'>
              <p className='lead text-md-left'>
                Welcome to this League of Legend Website ! By clicking on Stats in the navigation bar above, you will be able to see some amazing stats from your previous games !
              </p>
              </div>
            </div>
          </div>
        </div>
      </div>
      
    )
  };
  
export default Home;
