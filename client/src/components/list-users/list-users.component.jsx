import React, { Fragment, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { getUsers, deleteUser } from '../../redux/user/user.actions';

const ListUsers = ({ users, getUsers, deleteUser }) => {

    useEffect(() => {
        getUsers();
    },[getUsers]);


    return (
        <Fragment >
            <table className="table">
                <thead className="table-light">
                <tr>
                    <th scope="col">ID</th>
                    <th scope="col">Nome</th>
                    <th scope="col">Sobrenome</th>
                    <th scope="col">Username</th>
                    <th scope="col">Data</th>
                    <th scope="col">Editar</th>
                    <th scope="col">Apagar</th>
                </tr>
                </thead>
                <tbody>
                    {
                        users.length > 0 && users.map(user => (
                            <tr key={user.user_id}>
                                <th scope="row">{user.user_id}</th>
                                <td>{user.nome}</td>
                                <td>{user.sobrenome}</td>
                                <td>{user.username}</td>
                                <td>{user.datacriacao}</td>
                                <td> <Link className='btn btn-warning' to={`/edit/${user.user_id}`}> Editar </Link> </td>
                                <td> <button className='btn btn-danger' onClick={()=> deleteUser(user.user_id)} > Excluir </button> </td>
                            </tr>
                        ))
                    }
                </tbody>
            </table>
        </Fragment>
    )
}

const mapStateToProps = (state) => ({
    users: state.users.users
});

export default connect(mapStateToProps, { getUsers, deleteUser })(ListUsers);