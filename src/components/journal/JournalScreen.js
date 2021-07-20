import React from 'react';
import { useSelector } from 'react-redux';
import { NoteScreen } from '../notes/NoteScreen';
import { NothingSelected } from './NothingSelected';
import { Sidebar } from './Sidebar';
import { SidebarMobile } from './SidebarMobile';
export const JournalScreen = () => {


    const { active } = useSelector(state => state.notes)

    return (
        <div className="row animate__animated animate__fadeIn">
            <div className="col col-md-3 pe-0 me-0 d-none d-lg-block">
                <Sidebar/>
            </div>

            <div className="col-3 pe-0 me-0 d-block d-lg-none">
                <SidebarMobile />
            </div>

            
            <main className="px-0 mx-0 col-9 col-lg-9">
                {/* Si se da click en New Entry o en alguna nota, active pasa de null a un objeto */}
                {/* Si active esta en null por lo tanto no mostrará el <NoteScreen /> sino el <NothingSelected /> */}
                {
                    (active) 
                        ? (<NoteScreen />)
                        : (<NothingSelected />)
                }                
            </main>          

        </div>
    )
}
