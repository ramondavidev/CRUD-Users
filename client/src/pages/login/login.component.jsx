import React, { Fragment, useState } from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';
import { login } from '../../redux/auth/auth.actions';

import CustomButton from '../../components/custom-button/custom-button.component';


import './login.styles.scss';

const LoginPage = ({ auth, login }) => {

    const [formData, setFormData] = useState({
        username: '',
        password: ''
    });

    const { username, password } = formData;

    const onChange = (e) => {
        setFormData({...formData, [e.target.name]: e.target.value });
    }

    const onSubmit = async (e) => {
        e.preventDefault();
        login(username, password);
      };

    if (auth.isAuthenticated) {
        return <Redirect to="/" />;
    }


    return (
        <Fragment>
            <div className='login-page'>
            <div className='login'>
                <p className='title'>Olá, seja bem vindo</p>

                <form onSubmit={onSubmit}>
                    <div className='input'>
                        <label htmlFor="username">Username:</label>
                        <input 
                            className='input-pattern' 
                            type="text" 
                            name="username"
                            id="username" 
                            value={username}
                            onChange={onChange}
                        />
                    </div>
                    <div className='input'>
                        <label htmlFor="password">Senha:</label>
                        <input 
                            className='input-pattern' 
                            type="password" 
                            name="password" 
                            id="password" 
                            value={password}
                            onChange={onChange}
                        />
                    </div>
                    <CustomButton> Entrar </CustomButton>
                </form>
            </div>
        </div>
        </Fragment>
    )
};

const mapStateToProps = (state) => ({
    auth: state.auth
});

export default connect(mapStateToProps, { login })(LoginPage);