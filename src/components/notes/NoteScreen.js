import React, { useEffect, useRef } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Button, Container, Image, Input, TextArea } from 'semantic-ui-react'
import { NotesAppBar } from './NotesAppBar'
import { useDeconstruct } from './../../hooks/useDeconstruct';
import { activeNote, startDeleting } from '../../actions/notes';
import '../../styles/components/_notes.css'

export const NoteScreen = () => {

    const dispatch = useDispatch();

    const { active:note } = useSelector(state => state.notes)
    const [ formValues, handleInputChange, reset ] = useDeconstruct(note);
    
    const { body, title, id } = formValues;

    const activeId = useRef(note.id);
    
    useEffect(() => {
        
        if(note.id !== activeId.current){
            reset(note);

            activeId.current = note.id;
        }
        
    }, [note, reset]);

    useEffect(() => {

        dispatch(activeNote(formValues.id, {...formValues}));
        
    }, [formValues, dispatch])

    const handleDelete = () => {
        dispatch(startDeleting(id));
    }

    return (
        <>
            <NotesAppBar />
                
            <Container className="p-0 m-0 ps-md-3 pe-md-4 mx-md-3">
                <Input icon='quote right' className="mt-2 w-100" 
                        type="text" size="massive" autoComplete="off" 
                        transparent placeholder="Some awesome title" 
                        name="title"
                        value={ title }
                        onChange={ handleInputChange }
                />

                <hr />
                
                <TextArea className="border-0 w-100 notes__textarea" 
                            style={{ minHeight: 320, maxHeight: 400, outline: 'none' }} 
                            placeholder='What happened today' 
                            name="body"
                            value={ body }
                            onChange={ handleInputChange }
                />

                {
                    (note.url) &&
                    (<Image className="notes__image" style={{ maxHeight: 100 }} src={ note.url } size='small' />)
                }
                    
                
                
                <Button color='red' attached='bottom' onClick={ handleDelete }>Delete</Button>

            </Container>
        </>
    )
}
