import React from 'react'
import {
    Redirect,
    Switch,
    Route
  } from 'react-router-dom';
import { Container } from 'semantic-ui-react';
import { LoginScreen } from '../components/auth/LoginScreen'
import { RegisterScreen } from '../components/auth/RegisterScreen'
import '../styles/container/_login.css';

export const AuthRouter = () => {
    return (
        <div className="login__background">
            <Container className="login__container">
                <div className="login__form">
                    <Switch>
                        <Route exact path="/auth/login" component={ LoginScreen } />

                        <Route exact path="/auth/register" component={ RegisterScreen } />
                        
                        <Redirect to="/auth/login"/>
                    </Switch>
                </div>
            </Container>
        </div>
    )
}