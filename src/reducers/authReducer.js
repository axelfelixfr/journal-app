import { types } from "../types/types";

// Es necesario pasar un objeto vacío '{}', ya que si sea envía el state así mandara null o undefined y eso quiebra la aplicación
export const authReducer = ( state = {}, action ) => {

    // Usamos un switch para el type de la action
    switch (action.type) {

        // Si es login entonces regresa el uid y name del user
        case types.login:
            return {
                uid: action.payload.uid,
                name: action.payload.displayName,
                photoURL: action.payload.photoURL
            }

        // Si es logout entonces solo el objeto vacío
        case types.logout:
            return { }
    
        // Si no entro a los demás casos, entonces retorna el state
        default:
            return state;
    }
}