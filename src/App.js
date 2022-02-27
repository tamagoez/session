import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Login from './pages/login';
import Toppage from './pages/toppage';
 
 
class App extends React.Component {
  render(){
   return (
     <BrowserRouter>
       <Routes>
         <Route path="/" element={<Toppage />} />
         <Route path="/login" element={<Login />} />;
       </Routes>
     </BrowserRouter>
   );
  };
}

export default App;
