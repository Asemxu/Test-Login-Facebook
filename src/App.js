import './App.css';
// import { login } from './Facebook';
import React from 'react';
import { BrowserRouter , Route , Switch} from 'react-router-dom';
import { Login } from './Login';
import {Registro } from './Registro';
function App() {
  return (
    <BrowserRouter>
        <Switch>
            <Route exact path="/" component={Login}/>
            <Route exact path="/Registro" component={Registro}/>
        </Switch>
    </BrowserRouter>        
  );
}

export default App;
