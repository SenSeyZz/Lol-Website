import { useEffect, useState } from 'react';
import Navbar from '../Navbar';
import "../Images/bg.jpg"

const Home = () => {

  const [merchants, setMerchants] = useState(false);
  useEffect(() => {
    getMerchant();
  }, []);
  function getMerchant() {
    fetch('http://localhost:3001')
      .then(response => {
        return response.text();
      })
      .then(data => {
        setMerchants(data);
      });
  }
  
  function createMerchant() {
    let name = prompt('Enter merchant name');
    let email = prompt('Enter merchant email');
    fetch('http://localhost:3001/merchants', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({name, email}),
    })
      .then(response => {
        return response.text();
      })
      .then(data => {
        alert(data);
        getMerchant();
      });
  }
  function deleteMerchant() {
    let id = prompt('Enter merchant id');
    fetch(`http://localhost:3001/merchants/${id}`, {
      method: 'DELETE',
    })
      .then(response => {
        return response.text();
      })
      .then(data => {
        alert(data);
        getMerchant();
      });
  }
  
    
  

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
        <div>
      {merchants ? merchants : 'There is no merchant data available'}
      <br />
      <button onClick={createMerchant}>Add merchant</button>
      <br />
      <button onClick={deleteMerchant}>Delete merchant</button>
    </div>
      </div>
      
    )
  };
  
export default Home;
