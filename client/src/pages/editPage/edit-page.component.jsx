import React, { Fragment, useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { getUser, editUser } from '../../redux/user/user.actions';

import CustomButton from '../../components/custom-button/custom-button.component';

import './edit-page.styles.scss';

const EditPage = ({ match, user, history, getUser, editUser }) => {
  const [formData, setFormData] = useState({
    nome: '',
    sobrenome: '',
    username: '',
  });

    useEffect(() => {

    if(!user) {
      getUser(match.params.id);
    }

    if(user) {
      setFormData(user);
    }

        
    }, [getUser, match.params.id, user]);
    
    const { nome, sobrenome, username } = formData;

    const onChange = (e) => {
      setFormData({...formData, [e.target.name]: e.target.value });
  }

    const onSubmit = async (e) => {
        
      e.preventDefault();
        try {
          const form = {
            nome, sobrenome, username
          } 
          await editUser(form, match.params.id);
          history.push("/add-user");
        } catch (error) {
            
        }
    }

    console.log(formData);

    return(
        <Fragment>
            <div className='edit-page'>
              <h1 style={{marginTop: '70px'}}>Editar</h1>
              <form onSubmit={onSubmit}>
                <label htmlFor="nome">Nome:</label>
                <input
                id="nome"
                className='input-pattern' 
                type="text"
                placeholder="nome"
                name="nome"
                value={nome}
                onChange={onChange}
                />
                <label htmlFor="sobrenome">Sobrenome:</label>
                <input
                id="sobrenome"
                className='input-pattern' 
                type="text"
                placeholder="sobrenome"
                name="sobrenome"
                value={sobrenome}
                onChange={onChange}
                />
                <label htmlFor="username">Username:</label>
                <input
                id="username"
                className='input-pattern' 
                type="text"
                placeholder="username"
                name="username"
                value={username}
                onChange={onChange}
                />
                <CustomButton>Editar</CustomButton>
              </form>
            </div>
        </Fragment>
    )
}

const mapStateToProps = (state) => ({
  user: state.users.user
});

export default connect(mapStateToProps, { getUser, editUser })(EditPage);