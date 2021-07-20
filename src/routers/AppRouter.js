import React, { useEffect, useState } from 'react';
import {
    BrowserRouter as Router,
    Switch,
    Redirect
  } from 'react-router-dom';
import { JournalScreen } from '../components/journal/JournalScreen';
import { AuthRouter } from './AuthRouter';
import { firebase } from '../firebase/firebase-config';
import { useDispatch } from 'react-redux';
import { login } from '../actions/auth';
import { PublicRoute } from './PublicRoute';
import { PrivateRoute } from './PrivateRoute';
import { Loading } from '../components/loading/LoadingScreen';
import { startLoadingNotes } from '../actions/notes';
export const AppRouter = () => {

    const dispatch = useDispatch();

    const [checking, setChecking] = useState(true);

    const [isloggedIn, setIsloggedIn] = useState(false);

    useEffect(() => {
        
        // onAuthStateChanged devuelve un firebase.Unsubscribe que sirve como un observable (que es un tipo de objeto especial)
        // Cuando la autenticación cambia o si se vuelve a loguear un usuario se dispara el onAuthStateChanged
        // Por lo tanto eso sirve para estar al pendiente de la autentificación
        firebase.auth().onAuthStateChanged( async (user) => {
            if(user?.uid){
                dispatch(login(user.uid, user.displayName, user.photoURL));
                
                // El setIsloggedIn pasa a true ya que significa que si esta logueado el usuario ya que si entro a la condición if
                setIsloggedIn(true);
                
                dispatch(startLoadingNotes(user.uid));
            } else {

                // Si no entro a la condición entonces significa que no esta logueado y pasa a false el setIsloggedIn
                setIsloggedIn(false);
            }
            
            // En el momento que se sepa si hay un usuario autenticado o no, se dispara el setChecking en false
            // Ya que significa que ya termino de hacer el proceso Firebase
            setChecking(false);
        });

    }, [dispatch, setChecking, setIsloggedIn]);
    
    if(checking){
        return (
            <Loading/>
        )
    }

    return (
        <Router>
            <div>
                <Switch>
                    <PublicRoute isAuthenticated={ isloggedIn } path="/auth" component={ AuthRouter } />

                    <PrivateRoute isAuthenticated={ isloggedIn } exact path="/" component={ JournalScreen } />

                    <Redirect to="/auth/login"/>
                </Switch>
            </div>
        </Router>
    )
}
