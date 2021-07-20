import React from 'react'
import { useLoading, Grid } from '@agney/react-loading';
import '../../styles/container/_login.css';
import { Container } from 'semantic-ui-react';

export const Loading = () => {

    const { containerProps, indicatorEl } = useLoading({
        loading: true,
        indicator: <Grid width="100" fill="white" />,
    });

    return (
        <div className="auth__background-loading">
            <Container className="login__container">
                <div className="login__form auth__loading">
                    <section {...containerProps}>
                        {indicatorEl}
                    </section>
                </div>
            </Container>
        </div>
        
    )
}
