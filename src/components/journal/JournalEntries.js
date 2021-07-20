import React from 'react'
import { JournalEntry } from './JournalEntry';
import '../../styles/components/_journal.css';
import { useSelector } from 'react-redux';


export const JournalEntries = () => {

    const { notes } = useSelector(state => state.notes);

    return (
        <div className="p-0 m-0 journal__entries"> 
            {
                notes.map(note => (
                    <JournalEntry 
                        key={note.id} 
                        { ...note }
                    />
                ))
            }
        </div>
    )
}
