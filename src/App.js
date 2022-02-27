import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Login from './pages/login';
import Toppage from './pages/toppage';
 
 
class App extends React.Component {
  render(){
   return (
     <BrowserRouter>
       <Routes>
         <Route exact path="/" component={Toppage} />
         <Route exact path="/login" component={Login} />
       </Routes>
     </BrowserRouter>
   );
  };
}

export default App;
