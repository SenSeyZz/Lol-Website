import React from 'react';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/Home"
import Stats from "./pages/Stats"

function App(){

  return(

    <div>
    <BrowserRouter>
        <Routes> 
              <Route path="/" element={<Home />} />
              <Route path="/stats" element={<Stats />} />
        </Routes>
    </BrowserRouter>

  </div>
    
  )

}
  
export default App;
