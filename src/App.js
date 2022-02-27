import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Login from './pages/login';
import Toppage from './pages/toppage';

// https://zenn.dev/kenara/articles/3677b9a899cfb9
import NotFound from './components/404'
 
class App extends React.Component {
  render(){
   return (
     <BrowserRouter>
       <Routes>
         <Route path="/" element={<Toppage />} />
         <Route path="/login" element={<Login />} />
         // https://reffect.co.jp/react/react-router-6
         <Route path="*" element={<NotFound />} />;
       </Routes>
     </BrowserRouter>
   );
  };
}

export default App;
