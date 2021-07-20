import React from 'react';
import '../../styles/components/_journal.css';
import moment from 'moment';
import { activeNote } from '../../actions/notes';
import { useDispatch } from 'react-redux';

export const JournalEntry = ({ id, date, title, body, url }) => {

    const dispatch = useDispatch();

    const noteDate = moment(date);
    
    const handleEntryClick = () => {
        dispatch(activeNote(id, {
            date, title, body, url
        }
        ));
    }
    
    return (
        <div className="mx-1 cursor-pointer journal__entry animate__animated animate__fadeInRight mx-md-0 d-flex justify-content-center justify-content-md-between"
             onClick={ handleEntryClick }
        >
            {
                url &&
                (<div 
                    className="journal__entry-picture d-none d-md-flex"
                    style={{ 
                        backgroundSize: 'cover',
                        backgroundImage: `url(${url})` 
                    }}
                ></div>)
            }
            

            <div className="journal__entry_body d-none d-md-block">
                <p className="journal__entry-title">
                    { title }
                </p>

                <p className="journal__entry-content">
                    { body }
                </p>
            </div>

            <div className="journal__entry-date-box d-flex d-md-none d-lg-flex">
                <span>{ noteDate.format('dddd') }</span>
                <h4>{ noteDate.format('Do') }</h4>
            </div>
        
        </div>
    )
}
