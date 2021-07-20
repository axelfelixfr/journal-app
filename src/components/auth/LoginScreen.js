import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { startGoogleLogin, startLoginEmailPassword, startFacebookLogin, startGithubLogin, startYahooLogin } from '../../actions/auth';
import { Button, Card, Form, Header, Icon, Input, Message } from 'semantic-ui-react';
import { useForm } from 'react-hook-form';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';

export const LoginScreen = () => {
    
    // El hook useDispatch (de react-redux) nos servira para disparar alguna action en el redux
    const dispatch = useDispatch();

    const schema = yup.object().shape({
        email: yup.string().email().required(),
        password: yup.string().min(8).max(32).required().matches(/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$/, 'The password must be at least 8 letters long and include at least one capital letter and one number'),
    });

    const { register, handleSubmit, formState: { errors } } = useForm({
        resolver: yupResolver(schema),
    });

    const { loading } = useSelector(state => state.ui)

    const handleLogin = (data) => {
        const { email, password } = data;
        dispatch(startLoginEmailPassword(email, password));
    }

    const handleGoogleLogin = () => {
        dispatch(startGoogleLogin());
    }

    const handleFacebookLogin = () => {
        dispatch(startFacebookLogin());
    }

    const handleGithubLogin = () => {
        dispatch(startGithubLogin());
    }

    const handleYahooLogin = () => {
        dispatch(startYahooLogin());
    }

    return (
        <> 
            <Card>
                <div className="auth__form-content animate__animated animate__fadeInDown">
                    <Header as='h5' icon textAlign='center'>
                        <Icon name='user' circular />
                        <Header.Content>Login</Header.Content>
                    </Header>

                        {/* Le pasamos la función del login al formulario */}
                        <Form onSubmit={ handleSubmit(handleLogin) } loading={ loading }>
                        
                                <Form.Input label='Email' error={errors.email?.message}
                                    input={
                                        <Input 
                                            {...register("email")}
                                            type="email"
                                            placeholder="Email"
                                            autoComplete="off"
                                            name="email" 
                                        />
                                    }
                                />
                                
                                <Form.Input label='Password' error={errors.password?.message}
                                    input={
                                        <Input 
                                            {...register("password")}
                                            type="password"
                                            placeholder="Password"
                                            name="password" 
                                        />
                                    }
                                />
                                
                                <div className="text-center">
                                    <Button color='green' type="submit">Sign In</Button>
                                </div>

                                <div className="px-3 text-center d-none d-lg-block">
                                    <Header className="my-2" size='tiny'>Login with social networks</Header>

                                    <Button className="my-2" color='facebook' onClick={ handleFacebookLogin } fluid animated>
                                        <Button.Content visible><Icon name='facebook' /> Login with Facebook</Button.Content>
                                        <Button.Content hidden>
                                            <Icon name='facebook' />
                                        </Button.Content>
                                    </Button>

                                    <Button className="my-2" color='violet' onClick={ handleYahooLogin } fluid animated>
                                        <Button.Content visible><Icon name='yahoo' /> Login with Yahoo</Button.Content>
                                        <Button.Content hidden>
                                            <Icon name='yahoo' />
                                        </Button.Content>
                                    </Button>

                                    <Button className="my-2" color='google plus' onClick={ handleGoogleLogin } fluid animated>
                                        <Button.Content visible><Icon name='google' /> Login with Google</Button.Content>
                                        <Button.Content hidden>
                                            <Icon name='google' />
                                        </Button.Content>
                                    </Button>

                                    <Button className="mt-2" color='black' onClick={ handleGithubLogin } fluid animated>
                                        <Button.Content visible><Icon name='github' /> Login with Github</Button.Content>
                                        <Button.Content hidden>
                                            <Icon name='github' />
                                        </Button.Content>
                                    </Button>
                                    
                                </div>

                                <div className="text-center d-block d-lg-none">
                                    <Header className="my-2" size='tiny'>Login with social networks</Header>
                                    <Button circular color='facebook' icon='facebook' onClick={ handleFacebookLogin } />
                                    <Button circular color='violet' icon='yahoo' onClick={ handleYahooLogin } />
                                    <Button circular color='google plus' icon='google' onClick={ handleGoogleLogin } />
                                    <Button circular color='black' icon='github' onClick={ handleGithubLogin } />
                                </div>
                        </Form>
                </div>

                <Message attached='bottom' warning>
                    <Icon name='help' />
                    Don't have an account yet?&nbsp;<Link className="link" to="/auth/register">Create a new account</Link>&nbsp;right now.
                    {/* Usamos el componente <Link /> del react-router-dom para ir a la ruta de register */}
                </Message>
            
            </Card>  
        </>
)}