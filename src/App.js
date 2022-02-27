import React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import login from './page/login';
import toppage from './page/top';
 
 
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
