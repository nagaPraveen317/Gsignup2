// App.js
import React, { useState } from 'react';
import SignUp from './SignUp';
import LoginPage from './LoginPage';
import Navigation from './Navigation';
import Mainweather from './weather/Mainweather.js'

import Home from './Home.js';
function App() {
    const [formData, setFormData] = useState({
        firstName: '',
        lastName: '',
        email: '',
        password: '',
        confirmPassword: ''
      });
    
  const [currentPage, setCurrentPage] = useState('SignUp');

  const[Homebutton,setHomebutton]=useState(null);


  const handleNavigation = (page) => {
    setCurrentPage(page);
  };
  const handleHomepage=()=>{
   
      if(Homebutton==='Signup')
      {
        handleNavigation('SignUp')
      }
      else{
        handleNavigation('LoginPage')
      }
      
  }
  

  return (
    <div>
      
       {currentPage==='Home' && <Home onNavigate={(page) => handleNavigation(page)} Homebutton={Homebutton} setHomebutton={setHomebutton}/>}
       
       {console.log("clicked button: ",Homebutton)}
        {currentPage === 'SignUp' && <SignUp formData={formData} setFormData={setFormData}  onNavigate={(page) => handleNavigation(page)} />}

   
      {currentPage === 'LoginPage'&& <LoginPage userData={formData}
      onNavigate={
        () => {handleNavigation('Navigation')}
        } />}
      
      {currentPage=='Navigation' && <Navigation onNavigate={(page) => handleNavigation(page)}/>} 
      {currentPage=='Mainweather' && <Mainweather/>}
      
    </div>
  );
}

export default App;