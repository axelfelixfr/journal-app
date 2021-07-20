import React from 'react'
import { Header, Icon } from 'semantic-ui-react';
import '../../styles/components/_nothing.css';

export const NothingSelected = () => {
    return (
        <div className="nothing__main-content">
            <div className="nothing__center-content animate__animated animate__bounce">
                <Header as='h2' icon>
                    <span className="text-white">Selected something</span>
                    <Header.Subheader className="text-white">
                    pr create an entry!
                    </Header.Subheader>
                    <Icon className="pt-2 text-white" name='star outline' size='massive' />
                </Header>
            </div>            
        </div>
    )
}
