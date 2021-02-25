import React, { Fragment, useState } from 'react';
import { useHistory } from "react-router-dom";
import { Link } from 'react-router-dom';
import api from '../../utils/api';

import CustomButton from '../../components/custom-button/custom-button.component';


import './register.styles.scss';

const RegisterPage = () => {
    const history = useHistory();
    const [formData, setFormData] = useState({
        nome: '',
        sobrenome: '',
        username: '',
        senha: '',
        confirmarSenha: ''
    });

    const { nome, sobrenome, username, senha, confirmarSenha } = formData;

    const onChange = (e) => {
        setFormData({...formData, [e.target.name]: e.target.value });
    }

    const onSubmit = async(e) => {
        e.preventDefault();
        if (senha !== confirmarSenha) {
            alert('As senhas não são iguais!');
        } else {
            //register({ name, email, phone, password });
            const res = await api.post('/', formData);
            history.push("/login");
        }
    }


    return (
        <Fragment>
            <div className='register-page'>
            <div className='register'>
                <p className='title'>Criar uma conta</p>

                <form onSubmit={onSubmit}>
                    <div className='input'>
                        <label htmlFor="nome">Nome:</label>
                        <input 
                        className='input-pattern' 
                        type="text" 
                        name="nome" 
                        id="nome" 
                        value={nome}
                        onChange={onChange}
                        required
                    />
                    </div>
                    <div className='input'>
                        <label htmlFor="sobrenome">Sobre Nome:</label>
                        <input 
                        className='input-pattern' 
                        type="text" 
                        name="sobrenome" 
                        id="sobrenome" 
                        value={sobrenome}
                        onChange={onChange}
                        required
                    />
                    </div>
                    <div className='input'>
                        <label htmlFor="username">Username:</label>
                        <input 
                        className='input-pattern' 
                        type="text" 
                        name="username" 
                        id="username" 
                        value={username}
                        onChange={onChange}
                        required
                    />
                    </div>
                    <div className='input'>
                        <label htmlFor="senha">Senha:</label>
                        <input 
                        className='input-pattern' 
                        type="password" 
                        name="senha" 
                        id="senha" 
                        value={senha}
                        onChange={onChange}
                        required
                    />
                    </div>
                    <div className='input'>
                        <label htmlFor="confirmarSenha">Confirmar Senha:</label>
                        <input 
                        className='input-pattern' 
                        type="password" 
                        name="confirmarSenha" 
                        id="confirmarSenha" 
                        value={confirmarSenha}
                        onChange={onChange}
                        required
                    />
                    </div>
                        <CustomButton> Cadastrar </CustomButton>
                        <p className='info'>Já tem uma conta? <Link to='/login'>Entrar</Link></p>
                </form>
            </div>
        </div>
        </Fragment>
    )
};

export default RegisterPage;