import React from 'react'
import { Link } from 'react-router-dom'
import { Button, Card, Form, Header, Icon, Input, Message } from 'semantic-ui-react'
import { useForm } from 'react-hook-form';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import { useDispatch, useSelector } from 'react-redux';
import { startRegisterWithNameEmailPassword } from '../../actions/auth';


export const RegisterScreen = () => {

    const dispatch = useDispatch();

    const schema = yup.object().shape({
        name: yup.string().min(4).max(30).required().matches(/^[a-zA-Z\s\xE1\xE9\xED\xF3\xFA\xC1\xC9\xCD\xD3\xDA]{3,}$/, 'Must be only letters'),
        email: yup.string().email().required(),
        password: yup.string().min(8).max(32).required().matches(/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$/, 'The password must be at least 8 letters long and include at least one capital letter and one number'),
        password2: yup.string().oneOf([yup.ref('password'), null], "passwords don't match!")
    });

    const { register, handleSubmit, formState: { errors } } = useForm({
        resolver: yupResolver(schema),
    });

    const { loading } = useSelector(state => state.ui);

    const handleRegister = (data) => {

        const {  name, email, password, } = data;
        dispatch(startRegisterWithNameEmailPassword(name, email, password));

    };
    
    return (
        <>
            <Card>
                <div className="auth__form-content animate__animated animate__fadeInDown">
                    <Header as='h5' icon textAlign='center'>
                        <Icon name='user plus' circular />
                        <Header.Content>Register</Header.Content>
                    </Header>

                    <Form onSubmit={ handleSubmit(handleRegister) } 
                          loading={ loading }
                    >

                        <Form.Input label='Name' error={errors.name?.message}
                            input={
                                <Input 
                                    {...register("name")}
                                    type="text"
                                    placeholder="Name"
                                    autoComplete="off"
                                    name="name"
                                />
                            }
                        />

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

                        <Form.Input label='Confirm password' error={errors.password2?.message}
                            input={
                                <Input 
                                    {...register("password2")}
                                    type="password"
                                    placeholder="Confirm password"
                                    name="password2"
                                />
                            }
                        />

                        <div className="text-center">
                            <Button color="green" type="submit">Register</Button>
                        </div>

                    </Form>
                </div>

                <Message attached='bottom' warning>
                    <Icon name='help' />
                     Already signed up?&nbsp;<Link className="link" to="/auth/login">Login here</Link>&nbsp;instead.
                    {/* Usamos el componente <Link /> del react-router-dom para ir a la ruta de register */}
                </Message>
            </Card>
        </>
    )
}
