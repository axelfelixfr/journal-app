import React from 'react'
import { JournalEntries } from './JournalEntries'
import { useDispatch, useSelector } from 'react-redux';
import { startLogout } from '../../actions/auth';
import logo from '../../assets/logo/journal.svg';
import { Dropdown, Header, Icon, Image } from 'semantic-ui-react';
import '../../styles/components/_journal.css';
import '../../styles/components/_entry.css';
import { startNewNote } from '../../actions/notes';

export const Sidebar = () => {

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

            <div className="flex-shrink-0 w-auto p-3 text-white p-md-2 d-flex flex-column bg-dark journal__sidebar journal__viewport" >
                <span className="mb-3 text-white d-flex align-items-center mb-md-0 me-md-auto text-decoration-none">
                {/* <svg class="bi me-2" width="40" height="32"><use xlink:href="#bootstrap"/></svg> */}
                <img className="bi me-2" width="70" height="52" src={ logo } alt="Logotipo" />
                <span className="fs-4">Journal App</span>
                </span>
                <hr />
                <Header className="mt-0 mb-3 text-white cursor-pointer" 
                        as='h3' 
                        icon
                        onClick={ handleAddNew }
                >
                    <Icon name='calendar plus outline' />
                    New Entry
                </Header>
                
                <JournalEntries />
                
                
                <hr />

                <Header className="mt-0 text-white" as='h4'>
                    {
                        (photoURL) ? (<Image src={ photoURL } avatar/>)
                                   : (<Icon name='user'/>)
                    }
                    
                    <Header.Content>
                    { name + ' '}
                    <Dropdown>
                        <Dropdown.Menu>
                            <Dropdown.Item icon='sign-out' content='Sign Out' onClick={ handleLogout }></Dropdown.Item>
                        </Dropdown.Menu>
                        </Dropdown>
                    </Header.Content>
                </Header>
            </div>

        </aside>
    )
}
