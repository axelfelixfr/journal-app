import React from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { Dropdown, Header, Icon, Image } from 'semantic-ui-react';
import { startLogout } from '../../actions/auth';
import { startNewNote } from '../../actions/notes';
import logo from '../../assets/logo/journal.svg';
import '../../styles/components/_journal.css';
import '../../styles/components/_entry.css'
import { JournalEntries } from './JournalEntries';

export const SidebarMobile = () => {

    const dispatch = useDispatch();

    const { name, photoURL } = useSelector(state => state.auth);

    const handleLogout = () => {
        dispatch(startLogout());
    }

    const handleAddNew = () => {
        dispatch(startNewNote());
    }

    return (
        <aside>

            <div className="flex-shrink-0 w-auto d-flex flex-column bg-dark journal__viewport">
                <span className="p-3 text-center d-block">
                    <img width="40" height="40" src={ logo } alt="Logotipo" />
                </span>
                <hr />
                <Header className="p-1 mt-0 mb-3 text-white cursor-pointer" 
                        as='h6' 
                        icon
                        onClick={ handleAddNew }
                >
                    <Icon name='calendar plus outline' />
                    New Entry
                </Header>

                <JournalEntries />
                
                <div className="border-top w-100"></div>
                <div className="p-3 mx-auto text-center dropdown">
                
                <Header className="mt-0 text-white" as='h5' position='bottom'>
                    {/* <Icon name='trophy' /> */}
                    {
                        (photoURL) ? (<Image src={ photoURL } avatar/>)
                                   : (<Icon name='user'/>)
                    }
                    
                    {/* <img src="https://github.com/mdo.png" alt="" width="50" height="50" class="rounded-circle me-2" /> */}
                    <Header.Content>
                    <Dropdown>
                        <Dropdown.Menu>
                        {/* <Dropdown.Header icon='user circle' content={ name } /> */}
                            <Dropdown.Item icon='user' content={'Signed in as ' + name } disabled></Dropdown.Item>
                            <Dropdown.Item icon='sign-out' content='Sign Out' onClick={ handleLogout }></Dropdown.Item>
                        </Dropdown.Menu>
                        </Dropdown>
                    </Header.Content>
                </Header>
                </div>
            </div>

        </aside>
    )
}
