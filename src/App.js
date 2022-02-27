import React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import login from './pages/login';
import toppage from './pages/top';
 
 
class App extends React.Component {
  render(){
    return(
      <BrowserRouter>
        <Switch>
          <Route exact path="/" component={toppage} />
          <Route exact path="/login" component={login} />
        </Switch>
      </BrowserRouter>
    );
  };
}
 
export default App;
