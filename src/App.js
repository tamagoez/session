import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import login from './pages/login';
import toppage from './pages/toppage';
 
 
class App extends React.Component {
  render(){
    return(
      <BrowserRouter>
        <Routes>
          <Route exact path="/" component={toppage} />
          <Route exact path="/login" component={login} />
        </Routes>
      </BrowserRouter>
    );
  };
}
 
export default App;
