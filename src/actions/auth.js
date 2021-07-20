import Swal from 'sweetalert2'
import { types } from '../types/types';
import { firebase, facebookAuthProvider, githubAuthProvider, googleAuthProvider, yahooAuthProvider } from '../firebase/firebase-config';
import { finishLoading, startLoading } from './ui';
import { noteLogout } from './notes';

export const startLoginEmailPassword = (email, password) => {
    return (dispatch) => {

        dispatch(startLoading());

        firebase.auth().signInWithEmailAndPassword(email, password).then(({ user }) => {
            // console.log(user);

            dispatch(login(user.uid, user.displayName, user.photoURL));

            dispatch(finishLoading());
        }).catch((error) => {
            // console.log(error);
            dispatch(finishLoading());

            // Swal.fire('Error', error.message, 'error');
            Swal.fire({
                title: 'Error',
                icon: 'error',
                html: error.message,
                showCloseButton: true,
                focusConfirm: true,
            });
        });
    }
}

export const startRegisterWithNameEmailPassword = (name, email, password) => {
    return (dispatch) => {

        dispatch(startLoading());

        firebase.auth().createUserWithEmailAndPassword(email, password)
                .then( async ({ user }) => {
                    // console.log(user);
                    await user.updateProfile({ displayName: name, photoURL: ''})

                    // Hacemos el dispatch para almacenarlo en Redux
                    dispatch(
                        login(user.uid, user.displayName, user.photoURL)
                    );

                    dispatch(finishLoading());

                }).catch((error) => {
                    dispatch(finishLoading());

                    // console.log(error);
                    Swal.fire({
                        title: 'Error',
                        icon: 'error',
                        html: error.message,
                        showCloseButton: true,
                        focusConfirm: true,
                    });
                });
    }
}

export const startGoogleLogin = () => {
    return (dispatch) => {
        firebase.auth().signInWithPopup(googleAuthProvider).then(({ user }) => {
            // console.log(user);
            dispatch(
                login(user.uid, user.displayName, user.photoURL)
            )

        }).catch((error) => {
            // console.log(error);
            Swal.fire({
                title: 'Error',
                icon: 'error',
                html: error.message,
                showCloseButton: true,
                focusConfirm: true,
            });
        })
    }
}

export const startFacebookLogin = () => {
    return (dispatch) => {
        firebase.auth().signInWithPopup(facebookAuthProvider).then(({ user }) => {
            // console.log(user);
            dispatch(
                login(user.uid, user.displayName, user.photoURL)
            )
        }).catch((error) => {
            // console.log(error);
            Swal.fire({
                title: 'Error',
                icon: 'error',
                html: error.message,
                showCloseButton: true,
                focusConfirm: true,
            });
        })
    }
}


export const startGithubLogin = () => {
    return (dispatch) => {
        firebase.auth().signInWithPopup(githubAuthProvider).then(({ user }) => {
            // console.log(user);
            dispatch(
                login(user.uid, user.displayName, user.photoURL)
            )
        }).catch((error) => {
            // console.log(error);
            Swal.fire({
                title: 'Error',
                icon: 'error',
                html: error.message,
                showCloseButton: true,
                focusConfirm: true,
            });
        })
    }
}

export const startYahooLogin = () => {
    return (dispatch) => {
        firebase.auth().signInWithPopup(yahooAuthProvider).then(({ user }) => {
            // console.log(user);
            dispatch(
                login(user.uid, user.displayName, user.photoURL)
            )
        }).catch((error) => {
            // console.log(error);
            Swal.fire({
                title: 'Error',
                icon: 'error',
                html: error.message,
                showCloseButton: true,
                focusConfirm: true,
            });
        })
    }
}


// Declaramos el action 'auth' para el autenticar al usuario
// Es necesario que para hacer uso del action le mandemos el uid y el displayName
export const login = (uid, displayName, photoURL) => ({
        type: types.login,
        payload: {
            uid,
            displayName,
            photoURL
        }
});


export const startLogout = () => {
    return async (dispatch) => {
        await firebase.auth().signOut();

        dispatch(logout());

        dispatch(noteLogout());
    }
}

export const logout = () => ({
    type: types.logout
});