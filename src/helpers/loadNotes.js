import { db } from "../firebase/firebase-config"


export const loadNotes = async (uid) => {
    
    // Para acceder a las notas del usuario, primero obtenemos su uid, despues vamos a journal y por último a notes
    const notesSnap = await db.collection(`${uid}/journal/notes`).orderBy('date', 'desc').get();
    const notes = []

    // Hacemos un forEach para extraer cada uno de los elementos de notesSnap
    // Con el metodo push() podemos agregar al arreglo notes[] cada una de las notes que vienen en notesSnap
    notesSnap.forEach(snapHijo => {
        notes.push({
            id: snapHijo.id,
            ...snapHijo.data()
        });

        // El método data() nos trae toda la información de las notas (title, urlImage, body, etc)
        // Con el operador spread extraemos toda la información de data()
    });

    return notes;
}