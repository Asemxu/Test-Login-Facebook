import React from 'react';
import logo from './logo.svg';

export const Login = () =>{
    const loginRedirect  = async () =>{
        const uri =`${process.env.REACT_APP_URL}/Registro`
        window.open(`https://www.facebook.com/v11.0/dialog/oauth?client_id=${process.env.REACT_APP_API_KEY}&redirect_uri=${uri}&response_type=token&auth_type=rerequest&scope=email`,'_blank').focus();
    }
    return (
        <div className="App">
            <header className="App-header">
            <img src={logo} className="App-logo" alt="logo" />
            <p>
                Edit <code>src/App.js</code> and save to reload.
            </p>
            <a
                className="App-link"
                href="https://reactjs.org"
                target="_blank"
                rel="noopener noreferrer"
            >
                Learn React
            </a>
            <button className="btn btn-facebook" onClick={loginRedirect}>
                <i className="fa fa-facebook mr-1"></i>
                Login with Facebook
            </button>
            </header>
        </div>
    )
}

