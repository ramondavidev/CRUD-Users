import React, { Fragment } from 'react';
import { useHistory } from "react-router-dom";
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { logout } from '../../redux/auth/auth.actions';

import './header.styles.scss';

const Header = ({ auth: { isAuthenticated, loading }, logout }) => {

    const history = useHistory();

    const out = () => {
        logout()
        history.push("/login");
    }

    const guestLinks = (
        <Fragment>
            <Link className='nav-link link ' to='/register'>
                <i className="fas fa-user-plus fa-lg"></i>
                <div>Registrar</div>
            </Link>
            <Link className='nav-link link ' to='/login'>
                <i className="fas fa-sign-in-alt fa-lg"></i>
                <div>Entrar</div>
            </Link>
        </Fragment>
)

    const authLinks = (
        <div style={{display: 'flex'}}>
            <Link className='nav-link' to='/add-user'>Usuários</Link>
            <div onClick={() => out()} className='nav-link' to='/'>Sair</div>
        </div>
    );

    return (
        <Fragment >
            <div className='header-container'>
                <div>
                    <Link className='nav-link' to='/'>Home</Link>
                </div>
            
            {!loading && (
                        <Fragment>{isAuthenticated ? authLinks : guestLinks}</Fragment>
                    )}
                    </div>
        </Fragment>
    )
}

const mapStateToProps = state => ({
    auth: state.auth
  });

export default connect(mapStateToProps, { logout })(Header);