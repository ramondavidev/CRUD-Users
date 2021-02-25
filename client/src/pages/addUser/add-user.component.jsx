import React, { Fragment } from 'react';

import ListUsers from '../../components/list-users/list-users.component';

import './add-user.styles.scss';

const AddUser = () => {

    return (
        <Fragment>
            <div className='addPage-container'>
              <h1 style={{marginTop: '60px', marginBottom: '20px'}}> Lista de Usuários Cadastrados </h1>
              <ListUsers />
            </div>
        </Fragment>
    )
}

export default AddUser;