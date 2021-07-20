import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Button, Icon, Menu } from 'semantic-ui-react'
import { startSaveNote, startUploading } from '../../actions/notes';
import moment from 'moment';

export const NotesAppBar = () => {

    const dispatch = useDispatch();
    const { active } = useSelector(state => state.notes);

    const handleSave = () => {
        dispatch(startSaveNote(active));
    }

    const handlePictureClick = () => {
        document.querySelector('#fileSelector').click()
    }

    const handleFileChange = (e) => {
        const file = e.target.files[0];
        
        if(file){
            dispatch(startUploading(file));
            
        }
    }

    return (
         <main className="w-100 col-9" style={{background: '#2185d0'}} >
            <Menu color='blue' inverted>
                    <Menu.Item header className="d-none d-md-flex">{moment().format('MMMM Do YYYY')}</Menu.Item>
                    <Menu.Item header className="d-flex d-md-none">{moment().format('dddd')}</Menu.Item>

                    <input 
                        id="fileSelector"
                        type="file"
                        name="file"
                        style={{ display: 'none' }}
                        onChange={ handleFileChange }
                    />

                    <Menu.Menu position='right'>
                        <Menu.Item>
                            <Button color='red' 
                                    animated='vertical'
                                    className="d-none d-lg-flex"
                                    onClick={ handlePictureClick }
                            >
                                <Button.Content visible>Picture</Button.Content>
                                <Button.Content hidden>
                                    <Icon name='paperclip' />
                                </Button.Content>
                            </Button>
                            
                            <Button color='red' circular 
                                    icon='paperclip' className="mx-0 d-flex d-lg-none"
                                    onClick={ handlePictureClick }
                            />
                            
                        </Menu.Item>

                        <Menu.Item>
                        <Button color='green' 
                                animated='vertical'
                                className="d-none d-lg-flex"
                                onClick={ handleSave }
                        >
                            <Button.Content visible>Save</Button.Content>
                            <Button.Content hidden>
                                <Icon name='paper plane' />
                            </Button.Content>
                        </Button>

                        <Button color='green' circular 
                                icon='paper plane' className="mx-0 d-flex d-lg-none" 
                                onClick={ handleSave }    
                        />
                        </Menu.Item>
                    </Menu.Menu>
            </Menu>
         </main>         
    )
}
