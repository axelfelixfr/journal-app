import Swal from "sweetalert2";
import { db } from "../firebase/firebase-config";
import { fileUpload } from "../helpers/fileUpload";
import { loadNotes } from "../helpers/loadNotes";
import { types } from "../types/types";

export const startNewNote = () => {
    return async (dispatch, getState) => {

        // Podemos obtener toda la data del state con el método getState()
        /* 
            Ejemplo:
            {
                "auth": {
                    "uid": "2AjzsQeBFFdK9gSLc4XDbA5nETy1",
                    "name": "Axel",
                    "photoURL": null
                },
                "ui": {
                    "loading": false
                },
                "notes": {
                    "notes": [],
                    "active": null
                }
            }
        */
        const { uid } = getState().auth;

        const newNote = {
            title: '',
            body: '',
            date: new Date().getTime()
        }

        // Como esto es una promesa se debe hacer el async/await
        const doc = await db.collection(`${ uid }/journal/notes`).add(newNote);
        // Podemos agregar la newNote con el metodo add()

        // Hacemos el dispatch de activeNote y pasamos como argumentos, el id de la nota (que viene de Firebase)
        // y el objeto newNote que contiene todo el cuerpo de la nota (title, body, date)
        dispatch(activeNote(doc.id, newNote));

        // Para ver la nota en la sidebar una vez creada con activeNote hacemos el dispatch con los datos de la nota
        dispatch(addNewNote(doc.id, newNote));
    }
}

export const activeNote = (id, note) => ({
    type: types.notesActive,
    payload: {
        id,
        ...note
    }
    // Con el operador spread le pasamos todos los atributos de la nota (...note)
});

// Funci´ón para ver la nota en la sidebar una vez creada
export const addNewNote = (id, note) => ({
    type: types.notesAddNew,
    payload: {
        id,
        ...note
    }
})

export const startLoadingNotes = (uid) => {
    return async (dispatch) => {
        // Cargamos las notas del usuario con la función loadNotes pasandole su id del usuario
        const notes = await loadNotes(uid);
        dispatch(setNotes(notes));
 
    }
}


export const setNotes = (notes) => ({
    type: types.notesLoad,
    payload: notes
});


export const startSaveNote = (note) => {
    return async (dispatch, getState) => {
        const { uid } = getState().auth; // Sacamos el uid del usuario

        if(!note.url){
            delete note.url;
        }

        // Hacemos un clon o copia de la note, para borrar el id, ya que no queremos agregarlo al documento (doc) de la nota
        const noteToFirestore = { ...note };

        // Borramos el id de la nota (aunque solamente su copia)
        delete noteToFirestore.id;

        // Accedemos al documento de la nota a través del uid del usuario y el id de la note
        await db.doc(`${ uid }/journal/notes/${ note.id }`).update(noteToFirestore);
        // Con el método update() le pasamos la nueva nota que esta en noteToFirestore, para hacer la actualización 
    
        dispatch(refreshNote(note.id, noteToFirestore));

        Swal.fire({
            title: 'Saved',
            icon: 'success',
            html: note.title,
            showCloseButton: true,
            focusConfirm: true,
          })
    }
}

export const refreshNote = (id, note) => ({
    type: types.notesUpdated,
    payload: {
        id, 
        note: {
            id,
            ...note
        }
    }
});

export const startUploading = (file) => {
    return async (dispatch, getState) => {
        const { active:activeNote } = getState().notes;
        Swal.fire({
            title: 'Uploading...',
            icon: 'info',
            text: 'Please await....',
            allowOutsideClick: false,
            allowEnterKey: false,
            allowEscapeKey: false,
            showConfirmButton: false,
            willOpen: () => {
                Swal.showLoading();
            }
        })
        
        const fileUrl = await fileUpload(file);
        
        activeNote.url = fileUrl;

        dispatch(startSaveNote(activeNote))
        
        Swal.close();
    }
}


export const startDeleting = (id) => {
    return async (dispatch, getState) => {
        const uid = getState().auth.uid;

        await db.doc(`${ uid }/journal/notes/${ id }`).delete();

        dispatch(deleteNote(id));

        Swal.fire({
            title: 'Deleted successfully',
            icon: 'success',
            showCloseButton: true,
            focusConfirm: true,
        })
    }
}


export const deleteNote = (id) => ({
    type: types.notesDelete,
    payload: id
});


export const noteLogout = () => ({
    type: types.notesLogoutCleaning
})