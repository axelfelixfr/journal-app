import { createStore, combineReducers, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk';
import { authReducer } from '../reducers/authReducer';
import { notesReducer } from '../reducers/notesReducer';
import { uiReducer } from '../reducers/uiReducer';

// Como queremos usar tanto las herramientas de desarrollo de Redux y el middleware, debemos hacer la siguiente configuración:
const composeEnhancers = (typeof window !== 'undefined' && window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__) || compose;
// El argumento 'window.__REDUX_DEVTOOLS...' es para usar las herramientas de desarrollo de Redux en el navegador


// Usamos combineReducers para poder usar varios reducers en la aplicación, ya que al crear el store, solo es posible pasar uno por los parámetros
// El reducer que creamos para el auth lo pasamos en el combineReducers
const reducers = combineReducers({
    auth: authReducer,
    ui: uiReducer,
    notes: notesReducer
})

// Creamos el store de aplicación de redux con createStore
export const store = createStore(reducers, composeEnhancers(applyMiddleware(thunk))); // En el método composeEnhancers, le pasamos el middleware y dentro el thunk